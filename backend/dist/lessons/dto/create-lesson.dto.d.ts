import { LessonType } from "../entities/lesson.entity";
import { CreateEmbeddedQuestionDto } from "src/question/dto/create-embeddedQuestion.dto";
export declare class CreateLessonDto {
    title: string;
    type: LessonType;
    order: number;
    requiredScore: number;
    questions?: CreateEmbeddedQuestionDto[];
}
