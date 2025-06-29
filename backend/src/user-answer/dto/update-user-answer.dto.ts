import { IsNumber, IsOptional } from "class-validator";

export class UpdateUserAnswerDto {
  @IsOptional()
  @IsNumber()
  selectedOptionIndex?: number;
}