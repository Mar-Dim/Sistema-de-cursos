import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';

import { User } from '../users/entities/user.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private userAnswerRepo: Repository<UserAnswer>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,
  ) {}

  async upsertAnswer(dto: CreateUserAnswerDto): Promise<UserAnswer> {
    const { userId, questionId, selectedOptionIndex } = dto;

    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const question = await this.questionRepo.findOne({
      where: { id: questionId },
      relations: ['lesson'],
    });

    if (!question) throw new NotFoundException('Pregunta no encontrada');

    const isCorrect = question.correctOptionIndex === selectedOptionIndex;

    let answer = await this.userAnswerRepo.findOne({
      where: { user: { id: user.id }, question: { id: question.id } },
      relations: ['question'],
    });

    if (answer) {
      answer.selectedOptionIndex = selectedOptionIndex;
      answer.isCorrect = isCorrect;
    } else {
      answer = this.userAnswerRepo.create({
        user,
        question,
        selectedOptionIndex,
        isCorrect,
      });
    }

    await this.userAnswerRepo.save(answer);
    await this.updateProgress(user, question.lesson);

    return answer;
  }

  private async updateProgress(user: User, lesson: Lesson) {
    const totalQuestions = await this.questionRepo.count({
      where: { lesson: { id: lesson.id } },
    });

    const correctAnswers = await this.userAnswerRepo.count({
      where: {
        user: { id: user.id },
        question: { lesson: { id: lesson.id } },
        isCorrect: true,
      },
    });

    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    let progress = await this.progressRepo.findOne({
      where: {
        user: { id: user.id },
        lesson: { id: lesson.id },
      },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        user,
        lesson,
        score,
        completed: score === 100,
      });
    } else {
      progress.score = score;
      progress.completed = score === 100;
    }

    await this.progressRepo.save(progress);
  }

  async findAll(): Promise<UserAnswer[]> {
    return this.userAnswerRepo.find({ relations: ['user', 'question'] });
  }

  async findOne(id: number): Promise<UserAnswer> {
    return this.userAnswerRepo.findOneOrFail({ where: { id }, relations: ['user', 'question'] });
  }

  async remove(id: number): Promise<void> {
    const answer = await this.userAnswerRepo.findOne({
      where: { id },
      relations: ['user', 'question'],
    });

    if (!answer) throw new NotFoundException();

    await this.userAnswerRepo.remove(answer);
    await this.updateProgress(answer.user, answer.question.lesson);
  }
}