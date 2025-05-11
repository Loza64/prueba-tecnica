/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Pays {
    @PrimaryGeneratedColumn('increment')
    n_order: number;

    @ManyToOne(() => User, (user) => user.pays, { onDelete: 'CASCADE', nullable: true })
    user: User;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    pay_date: Date;
}