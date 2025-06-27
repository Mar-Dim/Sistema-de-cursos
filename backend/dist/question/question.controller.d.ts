import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateQuestionDto: UpdateQuestionDto): string;
    remove(id: string): string;
}
