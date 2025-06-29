import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<import("./entities/lesson.entity").Lesson>;
    getRecommendation(userId: number): Promise<import("./entities/lesson.entity").Lesson>;
    findAll(): Promise<import("./entities/lesson.entity").Lesson[]>;
    findOne(id: string): Promise<import("./entities/lesson.entity").Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<import("./entities/lesson.entity").Lesson>;
    remove(id: string): Promise<void>;
}
