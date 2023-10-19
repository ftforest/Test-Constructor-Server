import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {timestamp} from "rxjs";
import {Test} from "../tests/test.entity";
import {Question} from "../questions/question.entity";

@Entity('answers')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    value: string;

    @Column({ type:"boolean"})
    correct: boolean;

    @ManyToOne(type => Question, answer => answer.id)
    question_id: Question;

    constructor(answer: Partial<Answer>) {
        Object.assign(this, answer);
    }
}