import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Progress {
    id: number;
    user: User;
    lesson: Lesson;
    score: number;
    completed: boolean;
}
