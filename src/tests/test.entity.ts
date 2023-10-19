import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {timestamp} from "rxjs";
import {Question} from "../questions/question.entity";

@Entity('tests')
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    title: string;

    @Column({ default: 0  })
    author_id: number;

    @Column({ default: timestamp() })
    created_at:  Date;

    @OneToMany(() => Question, (question) => question.testId)
    questions: Question[]

    constructor(test: Partial<Test>) {
        Object.assign(this, test);
    }
}