import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import { LessonUnlockCondition, UnlockType } from '../entities/lesson-unlock-condition.entity';

// Tu interfaz, que es muy buena.
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
    // Inyectamos el repositorio de las condiciones también
    @InjectRepository(LessonUnlockCondition)
    private readonly unlockConditionRepo: Repository<LessonUnlockCondition>,
  ) {}

  async getLessonsWithStatus(user: User): Promise<LessonWithStatus[]> {
    const allLessons = await this.lessonRepo.find({
      relations: {
        prerequisites: {
          sourceLesson: true, // Carga la lección que actúa como prerrequisito
        },
      },
      order: {
        order: 'ASC', // Ordenamos para una visualización consistente
      },
    });

    // Obtenemos todo el progreso de este usuario.
    const userProgress = await this.progressRepo.find({
      where: { user: { id: user.id } },
      relations: {
        lesson: true, // Cargamos la lección asociada a cada progreso
      },
    });
   const progressMap = new Map(userProgress.map(p => [p.lesson.id, p]));
   const lessonsWithStatus: LessonWithStatus[] = allLessons.map(lesson => {
       const progressForThisLesson = progressMap.get(lesson.id);

        if (progressForThisLesson && progressForThisLesson.completed) {
        return { lesson, status: 'completed' };
      }
       const isAvailable = this.isLessonAvailable(lesson, progressMap);

      if (isAvailable) {
        return { lesson, status: 'available' };
      }

       return { lesson, status: 'locked' };
    });

    return lessonsWithStatus;
  }

  private isLessonAvailable(lesson: Lesson, progressMap: Map<number, Progress>): boolean {
    // Caso base: Si no tiene prerrequisitos, está disponible.
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
          return true; // Ya verificamos que está 'completed'.
        
        case UnlockType.ON_SUCCESS:
          return progressOnSource.score >= sourceLesson.requiredScore;

        case UnlockType.ON_FAIL:
          return progressOnSource.score < sourceLesson.requiredScore;

        default:
          return false; }
    });
  }
}