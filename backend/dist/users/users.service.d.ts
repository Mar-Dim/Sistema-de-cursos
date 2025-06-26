import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(data: Partial<User>): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<User | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
