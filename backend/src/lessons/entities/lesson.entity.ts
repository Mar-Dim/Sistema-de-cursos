import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum LessonType{
  VOCABULARIO = 'vocabulario',
  GRAMATICA = 'gramatica',
  LISTENING = 'listening',
  PRACTICA = 'practica',
}


@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type: 'enum', enum: LessonType})
  type: LessonType;

  @Column()
  order: number;

  @Column()
  requiredScore: number;

  @OneToMany(() => Question, (question) => question.lesson, { cascade: true, eager: true })
  questions: Question[];
}
