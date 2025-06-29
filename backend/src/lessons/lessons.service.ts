import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ){}

  async create(createLessonDto: CreateLessonDto) {
    const {questions, ...rest} = createLessonDto;

    const lesson = await this.lessonRepo.create({
      ...rest,
      questions: questions?.map(q => ({
        ... q,
      })),
    });

    return this.lessonRepo.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepo.find();
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if(!lesson) throw new NotFoundException(`No se a encontrado ninguna leccion con el id ${id}`);
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Lección con id ${id} no encontrada`);
    }

    Object.assign(lesson, updateLessonDto);
    return this.lessonRepo.save(lesson);
  }

  async remove(id: number) {
    const resultado = await this.lessonRepo.delete(id);
    if(resultado.affected === 0) throw new NotFoundException(`Leccion con id ${id} no encotrada`);
  }
}
