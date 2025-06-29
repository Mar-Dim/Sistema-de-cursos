import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ type: 'enum', enum: LessonType, default:LessonType.LESSON })
  type: LessonType;

  @Column()
  order: number;

  @Column()
  requiredScore: number;

  @OneToMany(() => Question, (question) => question.lesson, { cascade: true, eager: true })
  questions: Question[];
}
