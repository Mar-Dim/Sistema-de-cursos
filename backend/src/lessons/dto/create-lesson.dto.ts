import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { LessonType } from "../entities/lesson.entity";
import { CreateEmbeddedQuestionDto } from "src/question/dto/create-embeddedQuestion.dto";

export class CreateLessonDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsEnum(LessonType, {message: 'Type solo puede ser de tipo vocabulario, gramtica, listening o practica'})
    type: LessonType;

    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNumber()
    @Min(85)
    @Max(100)
    requiredScore: number;

    @ValidateNested({ each: true })
    @Type(() => CreateEmbeddedQuestionDto)
    @IsOptional()
    questions?: CreateEmbeddedQuestionDto[];
}
