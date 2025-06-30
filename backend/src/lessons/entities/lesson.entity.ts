import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LessonUnlockCondition } from './lesson-unlock-condition.entity';

export enum LessonType {
  LESSON = 'lesson',
  QUIZ = 'quiz',
  CASE_STUDY = 'case_study',
  REMEDIATION = 'remediation',
  EVALUATION = 'evaluation',
}

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: LessonType, default: LessonType.LESSON })
  type: LessonType;

  @Column({ unique: true })
  order: number;

  @Column({nullable: true})

  requiredScore: number;

  @Column({ type: 'text', nullable: true }) 
  content: string;

  @OneToMany(() => Question, (question) => question.lesson, { cascade: true })
  questions: Question[];

  @OneToMany(() => LessonUnlockCondition, (condition) => condition.sourceLesson, { cascade: true })
  unlocks: LessonUnlockCondition[];

  @OneToMany(() => LessonUnlockCondition, (condition) => condition.targetLesson)
  prerequisites: LessonUnlockCondition[];
}

