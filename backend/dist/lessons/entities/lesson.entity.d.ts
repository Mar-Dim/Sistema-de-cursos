import { Question } from 'src/question/entities/question.entity';
export declare class Lesson {
    id: number;
    title: string;
    type: 'vocabulario' | 'gramatica' | 'listening' | 'practica';
    order: number;
    requiredScore: number;
    questions: Question[];
}
