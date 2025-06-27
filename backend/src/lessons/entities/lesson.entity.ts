import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: 'vocabulario' | 'gramatica' | 'listening' | 'practica';

  @Column()
  order: number;

  @Column()
  requiredScore: number;

  @OneToMany(() => Question, (question) => question.lesson, { cascade: true })
  questions: Question[];
}
