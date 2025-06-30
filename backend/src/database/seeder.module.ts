import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Question } from 'src/question/entities/question.entity';
import { LessonUnlockCondition } from 'src/lessons/entities/lesson-unlock-condition.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import { UserAnswer } from 'src/user-answer/entities/user-answer.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true}),
    TypeOrmModule.forRoot({type: 'postgres',
      host: 'maglev.proxy.rlwy.net',
      port: 40528,
      username: 'postgres',
      password: 'EthIpFLBtCwrykCBJOQKWLafsiRMppxr',
      database: 'railway',
      entities: [Lesson, Question, LessonUnlockCondition, Progress, UserAnswer, User],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // Importante para Railway
   }),
   TypeOrmModule.forFeature([Lesson, Question, LessonUnlockCondition, Progress, UserAnswer]),
  ],
  providers: [SeederService],
})
export class SeederModule {}