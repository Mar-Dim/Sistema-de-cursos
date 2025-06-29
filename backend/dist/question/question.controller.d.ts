import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): Promise<import("./entities/question.entity").Question>;
    findAll(): Promise<import("./entities/question.entity").Question[]>;
    findOne(id: string): Promise<import("./entities/question.entity").Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("./entities/question.entity").Question>;
    remove(id: string): Promise<void>;
}
