import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {timestamp} from "rxjs";
import {Test} from "../tests/test.entity";

export enum TypeQuestion {
    many,
    one,
    text,
}

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'description', type: 'varchar', length: 255 ,default: ''})
    description: string;

    @Column({ type: 'tinyint', default:  TypeQuestion.one })
    type: TypeQuestion;

    @Column({type:"int", default: 0 })
    order: number;

    @Column({ default: timestamp() })
    created_at:  Date;

    @Column({type:"int", default: 0 })
    testId: number;

    @ManyToOne(() => Test, (test) => test.id)
    test: Test;

    constructor(question: Partial<Question>) {
        Object.assign(this, question);
    }
}