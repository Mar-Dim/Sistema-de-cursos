import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Lesson, LessonType } from '../lessons/entities/lesson.entity';
import { UserAnswer } from '../user-answer/entities/user-answer.entity'; // Asegúrate que la ruta sea correcta

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
    
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
      private readonly dataSource: DataSource,
  ) {}
 async recordProgress(user: User, createProgressDto: CreateProgressDto): Promise<Progress> {
    const { lessonId, answers } = createProgressDto;

    const lesson = await this.lessonRepo.findOne({ 
      where: { id: lessonId },
      relations: ['questions'] 
    });
    if (!lesson) {
      throw new NotFoundException(`Lección con id ${lessonId} no encontrada`);
    }

    let finalScore = 100; // Puntuación por defecto para lecciones simples sin preguntas
    
    if ([LessonType.QUIZ, LessonType.EVALUATION].includes(lesson.type)) {
      if (!lesson.questions || lesson.questions.length === 0) {
        finalScore = 100; // Un quiz vacío se aprueba con 100
      } else {
        const answersMap = new Map(answers.map(a => [a.questionId, a.selectedOptionIndex]));
        let correctCount = 0;
        for (const question of lesson.questions) {
          if (answersMap.get(question.id) === question.correctOptionIndex) {
            correctCount++;
          }
        }
        finalScore = Math.round((correctCount / lesson.questions.length) * 100);
      }
    }
  return this.dataSource.transaction(async (manager) => {
      if (answers && answers.length > 0) {
        const userAnswersToSave = answers.map(ans => {
            const question = lesson.questions.find(q => q.id === ans.questionId);
            if (!question) {
              throw new BadRequestException(`La pregunta con id ${ans.questionId} no pertenece a esta lección.`);
            }
            const userAnswer = new UserAnswer();
            userAnswer.user = user;
            userAnswer.question = question;
            userAnswer.selectedOptionIndex = ans.selectedOptionIndex;
            userAnswer.isCorrect = question.correctOptionIndex === ans.selectedOptionIndex;
            return userAnswer;
        });
        await manager.save(UserAnswer, userAnswersToSave);
      }
      
      let progress = await manager.findOne(Progress, { 
        where: { 
          user: { id: user.id }, 
          lesson: { id: lessonId } 
        } 
      });

      if (!progress) {
        progress = new Progress();
        progress.user = user;
        progress.lesson = lesson;
      }
      
      progress.score = finalScore;
      progress.completed = true;
      
      return manager.save(Progress, progress);
    });
  }

  /**
   * Obtiene todos los registros de progreso. Útil para administración.
   */
  findAll(): Promise<Progress[]> {
    return this.progressRepo.find({ relations: ['user', 'lesson'] });
  }

  /**
   * Obtiene un registro de progreso por su ID.
   */
  async findOne(id: number): Promise<Progress> {
    const progress = await this.progressRepo.findOne({ where: { id }, relations: ['user', 'lesson'] });
    if (!progress) {
      throw new NotFoundException(`Registro de progreso con id ${id} no encontrado`);
    }
    return progress;
  }
  
  /**
   * Obtiene todo el progreso de un usuario específico por su ID.
   */
  findByUser(userId: number): Promise<Progress[]> {
    return this.progressRepo.find({
      where: { user: { id: userId } },
      relations: ['lesson'],
      order: { lesson: { order: 'ASC' } } // Ordenamos por el orden de la lección
    });
  }

  /**
   * Obtiene todos los registros de progreso para una lección específica.
   */
  findByLesson(lessonId: number): Promise<Progress[]> {
    return this.progressRepo.find({
      where: { lesson: { id: lessonId } },
      relations: ['user'],
    });
  }


  async update(id: number, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const progress = await this.progressRepo.preload({
      id,
      ...updateProgressDto,
    });
    if (!progress) {
      throw new NotFoundException(`Registro de progreso con id ${id} no encontrado`);
    }
    return this.progressRepo.save(progress);
  }

  async remove(id: number): Promise<void> {
    const result = await this.progressRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Registro de progreso con id ${id} no encontrado`);
    }
  }
}