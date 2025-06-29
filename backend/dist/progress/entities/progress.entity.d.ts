import { User } from 'src/users/entities/user.entity';
export declare class Progress {
    id: number;
    user: User;
    lesson: number;
    score: number;
    completed: boolean;
}
