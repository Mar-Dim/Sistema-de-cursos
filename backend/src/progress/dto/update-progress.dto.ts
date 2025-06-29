import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressDto } from './create-progress.dto';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProgressDto {
    @IsNumber()
    @Min(0)
    score?: number;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}
