import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
export declare class ProgressService {
    private readonly progressRepo;
    private readonly userRepo;
    private readonly lessonRepo;
    constructor(progressRepo: Repository<Progress>, userRepo: Repository<User>, lessonRepo: Repository<Lesson>);
    create(createProgressDto: CreateProgressDto): Promise<Progress>;
    findAll(): Promise<Progress[]>;
    findOne(id: number): Promise<Progress>;
    findByUser(id: number): Promise<Progress[]>;
    findByLesson(id: number): Promise<Progress[]>;
    update(id: number, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    remove(id: number): Promise<void>;
}
