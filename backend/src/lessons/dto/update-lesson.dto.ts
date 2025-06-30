import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { LessonType } from "../entities/lesson.entity";


export class UpdateLessonDto {

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsEnum(LessonType, { message: 'Type solo puede ser de tipo lesson , quiz, case_study, remediation o evaluation' })
    type: LessonType;

    @IsOptional()
    @IsNumber()
    order: number;

    @IsOptional()
    @IsNumber()
    requiredScore: number;
}
