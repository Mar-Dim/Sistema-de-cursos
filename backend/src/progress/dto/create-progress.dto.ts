import { IsBoolean, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProgressDto {

    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @IsNotEmpty()
    @IsNumber()
    lesson_id:number;

    @IsNumber()
    @Min(0)
    score:number;

    @IsNotEmpty()
    @IsBoolean()
    completed:boolean;
}
