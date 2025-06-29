import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
export declare class LessonsService {
    private readonly lessonRepo;
    constructor(lessonRepo: Repository<Lesson>);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    findOne(id: number): Promise<Lesson>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: number): Promise<void>;
}
