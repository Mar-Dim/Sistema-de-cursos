import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { User } from '../users/entities/user.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Question } from 'src/question/entities/question.entity';
export declare class UserAnswerService {
    private userAnswerRepo;
    private userRepo;
    private questionRepo;
    private progressRepo;
    constructor(userAnswerRepo: Repository<UserAnswer>, userRepo: Repository<User>, questionRepo: Repository<Question>, progressRepo: Repository<Progress>);
    upsertAnswer(dto: CreateUserAnswerDto): Promise<UserAnswer>;
    private updateProgress;
    findAll(): Promise<UserAnswer[]>;
    findOne(id: number): Promise<UserAnswer>;
    remove(id: number): Promise<void>;
}
