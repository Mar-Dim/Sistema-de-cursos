import { Question } from 'src/question/entities/question.entity';
export declare enum LessonType {
    VOCABULARIO = "vocabulario",
    GRAMATICA = "gramatica",
    LISTENING = "listening",
    PRACTICA = "practica"
}
export declare class Lesson {
    id: number;
    title: string;
    type: LessonType;
    order: number;
    requiredScore: number;
    questions: Question[];
}
