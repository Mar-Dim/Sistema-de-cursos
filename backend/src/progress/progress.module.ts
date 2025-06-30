import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { UserAnswer } from 'src/user-answer/entities/user-answer.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Progress, User, UserAnswer, Lesson])
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
