import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmbeddedQuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsNotEmpty()
  @IsNumber()
  correctOptionIndex: number;
}