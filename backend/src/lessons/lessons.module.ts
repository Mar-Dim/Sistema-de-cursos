import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Question } from '../question/entities/question.entity';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonRecommendationService } from './service/lesson-recommendation.service';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Question, Progress])],
  controllers: [LessonsController],
  providers: [LessonsService, LessonRecommendationService],
})
export class LessonsModule {}
