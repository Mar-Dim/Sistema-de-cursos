import { UserAnswerService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
export declare class UserAnswerController {
    private readonly service;
    constructor(service: UserAnswerService);
    upsert(dto: CreateUserAnswerDto): Promise<import("./entities/user-answer.entity").UserAnswer>;
    findAll(): Promise<import("./entities/user-answer.entity").UserAnswer[]>;
    findOne(id: number): Promise<import("./entities/user-answer.entity").UserAnswer>;
    remove(id: number): Promise<void>;
}
