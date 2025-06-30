import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from './lesson.entity';

export enum UnlockType {
  ON_SUCCESS = 'on_success', // Se desbloquea al aprobar la lección fuente
  ON_FAIL = 'on_fail',       // Se desbloquea al reprobar la lección fuente
  ON_COMPLETE = 'on_complete', // Se desbloquea simplemente al completar (para lecciones sin puntuación)
}

@Entity()
export class LessonUnlockCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.unlocks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'source_lesson_id' })
  sourceLesson: Lesson;

  @ManyToOne(() => Lesson, (lesson) => lesson.prerequisites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'target_lesson_id' })
  targetLesson: Lesson;

  @Column({ type: 'enum', enum: UnlockType })
  unlockType: UnlockType;
}