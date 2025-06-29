import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>
  ){}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const {lessonId , ...questionData} = createQuestionDto;
    const lesson = await this.lessonRepo.findOneBy({id: lessonId});

    if(!lesson) throw new NotFoundException('No se a encontrado la leccion a la que se quiere asignar la pregunta');
    const question = await this.questionRepo.create({
      ...questionData,
      lesson,
    });
    return this.questionRepo.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find();
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepo.findOneBy({id})
    if(!question) throw new NotFoundException(`No se encontro ninguna pregunta con id ${id}`);
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepo.findOneBy({id});
    if(!question) throw new NotFoundException(`No se encontro ninguna pregunta con id ${id}`);

    Object.assign(question, updateQuestionDto);
    return this.questionRepo.save(question);
  }

  async remove(id: number) {
    const result = await this.questionRepo.delete(id);
    if(result.affected === 0) throw new NotFoundException(`No se encontro ninguna pregunta con id ${id}`);
  }
}
