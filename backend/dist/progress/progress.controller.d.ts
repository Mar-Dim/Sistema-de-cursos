import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    create(createProgressDto: CreateProgressDto): Promise<import("./entities/progress.entity").Progress>;
    findAll(): Promise<import("./entities/progress.entity").Progress[]>;
    findAllByUser(id: string): Promise<import("./entities/progress.entity").Progress[]>;
    findAllByLesson(id: string): Promise<import("./entities/progress.entity").Progress[]>;
    findOne(id: string): Promise<import("./entities/progress.entity").Progress>;
    update(id: string, updateProgressDto: UpdateProgressDto): Promise<import("./entities/progress.entity").Progress>;
    remove(id: string): Promise<void>;
}
