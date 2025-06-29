import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class ProgressService {

  constructor(
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>
  ) { }

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    const { user_id, lesson_id, ...rest } = createProgressDto;

    const user = await this.userRepo.findOneByOrFail({ id: user_id });
    const lesson = await this.lessonRepo.findOneByOrFail({ id: lesson_id });

    const existing = this.progressRepo.findOneBy({
      user: user, lesson: lesson
    })

    if (!existing) throw new ConflictException('Ya existe un progreso para este usuario');

    const progress = await this.progressRepo.create({
      user,
      lesson,
      ...rest,
    });

    return this.progressRepo.save(progress);
  }

  async findAll(): Promise<Progress[]> {
    return await this.progressRepo.find({
      relations: ['user', 'lesson']
    });
  }

  async findOne(id: number): Promise<Progress> {
    const progress = await this.progressRepo.findOneBy({ id });
    if (!progress) throw new NotFoundException(`No se encontro el progreso con identificador ${id}`);
    return progress;
  }

  async findByUser(id: number): Promise<Progress[]> {
    const progress = await this.progressRepo.findBy({ user: { id } });
    if (!progress) throw new NotFoundException(`No se encontro ningun progreso del usuario con id ${id}`);
    return progress;
  }

  async findByLesson(id: number): Promise<Progress[]> {
    const progress = await this.progressRepo.findBy({ lesson: { id } });
    if (!progress) throw new NotFoundException(`No se encontro el progreso asociado a la leccion con id  ${id}`);
    return progress;
  }

  async update(id: number, updateProgressDto: UpdateProgressDto) {
    const progress = await this.progressRepo.findOneBy({ id });
    if (!progress) throw new NotFoundException(`No se encontro el progreso con identificador ${id}`);
    Object.assign(progress, updateProgressDto);
    return this.progressRepo.save(progress);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.progressRepo.delete(id);
    if (resultado.affected === 0) throw new NotFoundException(`No se a encontrado el progreso a eliminar`);
  }
}
