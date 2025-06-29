import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Question, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'question_id' })
    question: Question;

    @Column()
    selectedOptionIndex: number;

    @Column({ default: false })
    isCorrect: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
