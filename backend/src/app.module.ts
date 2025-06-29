import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressModule } from './progress/progress.module';
import { UsersModule } from './users/users.module';
import { QuestionModule } from './question/question.module';
import { UserAnswerModule } from './user-answer/user-answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Maria2.0',
      database: 'curso_ingles',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    LessonsModule,
    ProgressModule,
    QuestionModule,
    UserAnswerModule,
  ],
})
export class AppModule {}

