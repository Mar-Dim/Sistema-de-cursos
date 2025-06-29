import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToOne(() => Lesson, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'lesson_id'})
  lesson: number;

  @Column({ default: 0 })
  score: number;

  @Column({ default: false })
  completed: boolean;
}