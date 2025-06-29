import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserAnswer,User,Question,Progress])
  ],
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
})
export class UserAnswerModule {}
