import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionService {
    create(createQuestionDto: CreateQuestionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateQuestionDto: UpdateQuestionDto): string;
    remove(id: number): string;
}
