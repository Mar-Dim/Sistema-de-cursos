// src/database/seeder.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Lesson, LessonType } from 'src/lessons/entities/lesson.entity';
import { Question } from 'src/question/entities/question.entity';
import { LessonUnlockCondition, UnlockType } from 'src/lessons/entities/lesson-unlock-condition.entity';
import { courseData } from './data/course.data';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  /**
   * Método principal orquestador que ejecuta la limpieza y el sembrado.
   */
  async runSeed() {
    this.logger.log('--- Starting complete seed process ---');
    await this.cleanDatabase();
    await this.seedLessons();
    this.logger.log('--- Seeding process finished successfully ---');
  }

  /**
   * Limpia todas las tablas relevantes en el orden correcto para evitar conflictos de claves externas.
   */
  private async cleanDatabase() {
    this.logger.warn('--- Cleaning database ---');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Orden de borrado: de las tablas más dependientes a las menos dependientes.
      // Los nombres deben coincidir con los de tu base de datos (generalmente minúsculas_con_guion_bajo).
      await queryRunner.query('DELETE FROM "user_answer"');
      await queryRunner.query('DELETE FROM "progress"');
      await queryRunner.query('DELETE FROM "lesson_unlock_condition"');
      await queryRunner.query('DELETE FROM "question"');
      await queryRunner.query('DELETE FROM "lesson"');

      this.logger.log('Database cleaned successfully.');
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error('Failed to clean database.', error.stack);
      await queryRunner.rollbackTransaction();
      throw error; // Detiene el proceso si la limpieza falla
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Siembra las tablas Lesson, Question y LessonUnlockCondition a partir de courseData.
   */
  private async seedLessons() {
    this.logger.log('--- Seeding new data ---');

    await this.dataSource.transaction(async (entityManager) => {
      this.logger.log('Step 1: Creating Lessons and Questions...');
      const lessonsMap = new Map<number, Lesson>();

      for (const key in courseData) {
        const data = courseData[key];
        const lesson = new Lesson();
        lesson.order = data.id;
        lesson.title = data.name;
        lesson.type = data.type.toLowerCase() as LessonType;
        lesson.requiredScore = data.requiredScore;

        if (data.questions) {
          lesson.questions = data.questions.map(qData => {
            const question = new Question();
            question.text = qData.text;
            question.options = qData.options;
            // Aseguramos que correctAnswer sea un número, tomando el primer elemento si es un array.
            question.correctOptionIndex = Array.isArray(qData.correctAnswer) ? qData.correctAnswer[0] : qData.correctAnswer;
            return question;
          });
        }
        lessonsMap.set(data.id, lesson);
      }

      // Guardamos todas las lecciones y sus preguntas en una sola operación.
      const savedLessonsArray = await entityManager.save(Lesson, Array.from(lessonsMap.values()));

      // Creamos un nuevo mapa con las entidades guardadas, que ahora tienen IDs reales de la DB.
      const savedLessonsMap = new Map<number, Lesson>();
      savedLessonsArray.forEach(l => savedLessonsMap.set(l.order, l));

      this.logger.log('Step 2: Creating Lesson Unlock Conditions...');
      const unlockConditions: LessonUnlockCondition[] = [];

      for (const key in courseData) {
        const data = courseData[key];
        const sourceLesson = savedLessonsMap.get(data.id);

        if (!sourceLesson) continue;

        (data.unlocks || []).forEach((targetLessonOrder: number) => {
          const targetLesson = savedLessonsMap.get(targetLessonOrder);
          if (targetLesson) {
            const condition = new LessonUnlockCondition();
            condition.sourceLesson = sourceLesson;
            condition.targetLesson = targetLesson;
            condition.unlockType = (sourceLesson.type === LessonType.QUIZ || sourceLesson.type === LessonType.EVALUATION)
              ? UnlockType.ON_SUCCESS
              : UnlockType.ON_COMPLETE;
            unlockConditions.push(condition);
          }
        });

        (data.unlocksOnFail || []).forEach((targetLessonOrder: number) => {
          const targetLesson = savedLessonsMap.get(targetLessonOrder);
          if (targetLesson) {
            const condition = new LessonUnlockCondition();
            condition.sourceLesson = sourceLesson;
            condition.targetLesson = targetLesson;
            condition.unlockType = UnlockType.ON_FAIL;
            unlockConditions.push(condition);
          }
        });
      }

      await entityManager.save(LessonUnlockCondition, unlockConditions);
      this.logger.log('Data seeded successfully into the database.');
    });
  }
}