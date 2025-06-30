import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Question } from '../question/entities/question.entity';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonPathService} from './service/lesson-path.service';
import { Progress } from 'src/progress/entities/progress.entity';
import { LessonUnlockCondition } from './entities/lesson-unlock-condition.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson, Question, Progress, LessonUnlockCondition])],
  controllers: [LessonsController],
  providers: [LessonsService, LessonPathService],
})
export class LessonsModule {}
