import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
export declare class UserAnswer {
    id: number;
    user: User;
    question: Question;
    selectedOptionIndex: number;
    isCorrect: boolean;
    createdAt: Date;
}
