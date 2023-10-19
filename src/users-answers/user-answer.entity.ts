import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {timestamp} from "rxjs";
import {User} from "../users/user.entity";
import {Answer} from "../answers/answer.entity";



@Entity('user-answers')
export class UserAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    user_id: User;

    @ManyToOne(type => Answer, answer => answer.id)
    answer_id: Answer;

    @Column({ type: "varchar", default: '', length: 255 })
    value:  string;

    @Column({ default: timestamp() })
    created_at:  Date;

    constructor(user_answer: Partial<UserAnswer>) {
        Object.assign(this, user_answer);
    }
}