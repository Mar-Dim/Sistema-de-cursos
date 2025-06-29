import { Repository } from 'typeorm';
import { Progress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from '../entities/lesson.entity';
export declare class LessonRecommendationService {
    private readonly lessonRepo;
    private readonly progressRepo;
    constructor(lessonRepo: Repository<Lesson>, progressRepo: Repository<Progress>);
    getNextLesson(user: User): Promise<Lesson | null>;
}
