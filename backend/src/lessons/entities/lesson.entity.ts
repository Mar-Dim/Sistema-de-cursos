import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: 'vocabulario' | 'gramatica' | 'listening' | 'practica';

  @Column()
  order_index: number;
}
