import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  lesson_id: number;

  @Column({ default: 0 })
  score: number;

  @Column({ default: false })
  completed: boolean;
}