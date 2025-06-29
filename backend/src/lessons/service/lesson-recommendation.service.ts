import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Progress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class LessonRecommendationService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
  ) {}

  async getNextLesson(user: User): Promise<Lesson | null> {
    const progress = await this.progressRepo.find({
      where: { user: { id: user.id } },
      relations: ['lesson'],
      order: { lesson: { order: 'ASC' } }
    });

    if (!progress || progress.length === 0) {
      const firstLesson = await this.lessonRepo.findOne({ order: { order: 'ASC' } });
      return firstLesson ?? null;
    }

    const lastProgress = progress.reverse().find(p => p.completed && p.score >= p.lesson.requiredScore) || progress[progress.length - 1];
    const nextOrder = lastProgress.lesson.order + 1;

    const nextLesson = await this.lessonRepo.findOne({ where: { order: nextOrder } });
    if (lastProgress.completed && lastProgress.score >= lastProgress.lesson.requiredScore && nextLesson) {
      return nextLesson;
    }
    return lastProgress.lesson;
  }
}
