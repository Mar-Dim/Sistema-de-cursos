import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { LessonRecommendationService } from './service/lesson-recommendation.service';
import { User } from 'src/users/entities/user.entity';
export declare class LessonsService {
    private readonly lessonRepo;
    private readonly lessonRecommendationService;
    constructor(lessonRepo: Repository<Lesson>, lessonRecommendationService: LessonRecommendationService);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    getRecommendedLesson(user: User): Promise<Lesson | null>;
    findAll(): Promise<Lesson[]>;
    findOne(id: number): Promise<Lesson>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: number): Promise<void>;
}
