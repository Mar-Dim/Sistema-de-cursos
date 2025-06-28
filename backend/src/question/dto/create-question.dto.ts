import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQuestionDto {

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsArray()
    @IsString()
    options: string[];

    @IsNotEmpty()
    @IsNumber()
    correctOptionIndex: number;

    @IsNotEmpty()
    lessonId: number;
}
