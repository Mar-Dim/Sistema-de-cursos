import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsNumber()
  selectedOptionIndex: number;
}
