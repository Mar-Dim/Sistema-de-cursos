import { Lesson } from './../../lessons/entities/lesson.entity';
export declare class Question {
    id: number;
    text: string;
    options: string[];
    correctOptionIndex: number;
    lesson: Lesson;
}
