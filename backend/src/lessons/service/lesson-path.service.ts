import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from '../entities/lesson.entity';
import { DecisionContext } from '../desicion-tree/decision-types';
import { buildUnlockTree } from '../desicion-tree/decision-tree';


export type LessonStatus = 'locked' | 'available' | 'completed';

export interface LessonWithStatus {
  id: number;
  title: string;
  order: number;
  requiredScore: number;
  status: LessonStatus;
  progress?: number;
}

@Injectable()
export class LessonPathService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
  ) {}

  async getLessonsWithStatus(user: User): Promise<LessonWithStatus[]> {
    const lessons = await this.lessonRepo.find({ order: { order: 'ASC' } });
    const progresses = await this.progressRepo.find({
      where: { user: { id: user.id } },
      relations: ['lesson'],
    });

    return lessons.map((lesson, idx) => {
      const progress = progresses.find(p => p.lesson.id === lesson.id);

      // 1. Si está completada con score suficiente
      if (progress && progress.completed && progress.score >= lesson.requiredScore) {
        return { ...lesson, status: 'completed' as LessonStatus, progress: progress.score };
      }

      // 2. Primera lección siempre disponible
      if (idx === 0) {
        return { ...lesson, status: 'available' as LessonStatus, progress: progress?.score ?? 0 };
      }

     
      const prevLesson = lessons[idx - 1];
      const prevProgress = progresses.find(p => p.lesson.id === prevLesson.id);

      const context: DecisionContext = {
        completed: !!prevProgress?.completed,
        score: prevProgress?.score ?? 0,
      };

   
      const tree = buildUnlockTree(prevLesson.requiredScore, lesson.id);
      const unlockedLessonId = tree.evaluate(context);

      if (unlockedLessonId === lesson.id) {
        return { ...lesson, status: 'available' as LessonStatus, progress: progress?.score ?? 0 };
      }
      return { ...lesson, status: 'locked' as LessonStatus, progress: progress?.score ?? 0 };
    });
  }
}
