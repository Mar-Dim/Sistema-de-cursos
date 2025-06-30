import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { LessonPathService, LessonWithStatus } from './service/lesson-path.service';
import { LessonPathResponseDto } from './dto/lesson-path-response.dto';
@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
   private readonly lessonPathService: LessonPathService,
  ){}

  

async getLessonsPathForUser(user: User): Promise<LessonPathResponseDto[]> {
    return this.lessonPathService.getLessonsWithStatus(user);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepo.find();
  }

    async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      // Esta línea le dice a TypeORM: "Cuando busques esta lección,
      // haz un JOIN y tráeme también todas sus preguntas asociadas".
      relations: ['questions'], 
    });

    if(!lesson) {
      throw new NotFoundException(`No se ha encontrado ninguna lección con el id ${id}`);
    }
    return lesson;
  }
  async create(createLessonDto: CreateLessonDto) {
    const { questions, ...rest } = createLessonDto;
    const lesson = this.lessonRepo.create({
      ...rest,
      questions: questions,
    });
    return this.lessonRepo.save(lesson);
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepo.preload({ id, ...updateLessonDto });
    if (!lesson) {
      throw new NotFoundException(`Lección con id ${id} no encontrada`);
    }
    return this.lessonRepo.save(lesson);
  }

  async remove(id: number) {
    const result = await this.lessonRepo.delete(id);
    if(result.affected === 0) throw new NotFoundException(`Leccion con id ${id} no encontrada`);
  }

   async findOneWithDetails(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      // La clave está aquí: cargar las preguntas relacionadas
      relations: ['questions'], 
    });
    if (!lesson) {
      throw new NotFoundException(`Lección con id ${id} no encontrada`);
    }
    return lesson;
  }


}
