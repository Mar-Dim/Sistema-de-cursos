import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
  return this.usersRepository.find();
}

async findOne(id: number): Promise<User | null> {
  return this.usersRepository.findOne({ where: { id } });
}

async update(id: number, data: Partial<User>) {
  await this.usersRepository.update(id, data);
  return this.findOne(id);
}

async remove(id: number) {
  return this.usersRepository.delete(id);
}
}