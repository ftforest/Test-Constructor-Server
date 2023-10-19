import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {timestamp} from "rxjs";
import {User} from "../users/user.entity";
import {Test} from "../tests/test.entity";



@Entity('completed-tests')
export class CompletedTest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    user_id: User;

    @ManyToOne(type => Test, test => test.id)
    test_id: Test;

    @Column({ type: "int", default: 0 })
    right:  number;

    @Column({ type: "int", default: 0 })
    wrong:  number;

    @Column({ default: timestamp() })
    created_at:  Date;

    constructor(completed_test: Partial<CompletedTest>) {
        Object.assign(this, completed_test);
    }
}