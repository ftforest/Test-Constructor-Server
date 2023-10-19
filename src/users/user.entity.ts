import { Entity, Column, PrimaryGeneratedColumn, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column({type: "varchar",length: 255, default: '' })
    firstName: string;

    @Column({type: "varchar",length: 255, default: '' })
    lastName: string;

    @Column({type: "varchar",length: 255, default: '' })
    email: string;

    @Column({type: "varchar",length: 255, default: '' })
    password: string;

    @Column({type: "boolean", default: true })
    isActive: boolean;

    @Column("timestamp"  )
    createdAt: Date;

    @Column("timestamp" )
    editedAt: Date;

    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }
}