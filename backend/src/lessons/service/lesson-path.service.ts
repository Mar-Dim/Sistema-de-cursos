import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { LessonUnlockCondition, UnlockType } from '../entities/lesson-unlock-condition.entity';
import { LessonPathResponseDto } from '../dto/lesson-path-response.dto';
export interface LessonWithStatus {
  lesson: Lesson;
  status: 'locked' | 'available' | 'completed';
}

@Injectable()
export class LessonPathService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
    @InjectRepository(LessonUnlockCondition)
    private readonly unlockConditionRepo: Repository<LessonUnlockCondition>,
  ) {}

async getLessonsWithStatus(user: User): Promise<LessonPathResponseDto[]> {
    const allLessons = await this.lessonRepo.find({
      relations: { prerequisites: { sourceLesson: true } },
      order: { order: 'ASC' },
    });
    const userProgress = await this.progressRepo.find({
      where: { user: { id: user.id } },
      relations: { lesson: true },
    });
    const progressMap = new Map(userProgress.map(p => [p.lesson.id, p]));

    
    const lessonsWithStatus: LessonPathResponseDto[] = allLessons.map(lesson => {
      const progressForThisLesson = progressMap.get(lesson.id);
 const lessonNodeDto = {
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        order: lesson.order,
      };

      if (progressForThisLesson && progressForThisLesson.completed) {
        return {
          lesson: lessonNodeDto,
          status: 'completed',
          score: progressForThisLesson.score, // Incluimos el score
        };
      }

      const isAvailable = this.isLessonAvailable(lesson, progressMap);
      if (isAvailable) {
        return {
          lesson: lessonNodeDto,
          status: 'available',
        };
      }

      return {
        lesson: lessonNodeDto,
        status: 'locked',
      };
    });

    return lessonsWithStatus;
  }
  

  private isLessonAvailable(lesson: Lesson, progressMap: Map<number, Progress>): boolean {
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
      return true;
    }

    return lesson.prerequisites.every(condition => {
      const sourceLesson = condition.sourceLesson;
       const progressOnSource = progressMap.get(sourceLesson.id);
      if (!progressOnSource || !progressOnSource.completed) {
        return false;
      }
      
       switch (condition.unlockType) {
        case UnlockType.ON_COMPLETE:
          return true; 
        
        case UnlockType.ON_SUCCESS:
          return progressOnSource.score >= sourceLesson.requiredScore;

        case UnlockType.ON_FAIL:
          return progressOnSource.score < sourceLesson.requiredScore;

        default:
          return false; }
    });
  }
}