import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsArray()
    @IsString()
    options?: string[];

    @IsOptional()
    @IsNumber()
    correctOptionIndex?: number;
}
