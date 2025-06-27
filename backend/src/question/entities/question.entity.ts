import { Lesson } from './../../lessons/entities/lesson.entity';
import { Entity,ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctOptionIndex: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions, { onDelete: 'CASCADE' })
  lesson: Lesson;

}
