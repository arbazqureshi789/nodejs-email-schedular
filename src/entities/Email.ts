import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { v4 as uuid } from 'uuid';

@Entity()
export class Email {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmail()
    @Column()
    email: string;

    @Column()
    isEmailSend: boolean;

    @Column({ nullable: true })
    createdAt: Date;

    constructor() {
        this.id = uuid();
        this.email = '';
        this.isEmailSend = false;
        this.createdAt = new Date();
    }
}
