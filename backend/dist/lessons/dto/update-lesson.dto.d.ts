import { LessonType } from "../entities/lesson.entity";
export declare class UpdateLessonDto {
    title: string;
    type: LessonType;
    order: number;
    requiredScore: number;
}
