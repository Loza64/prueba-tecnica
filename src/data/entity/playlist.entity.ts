/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum State {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}

export enum Type {
    PRIVATE = 'private',
    PUBLIC = 'public',
}

@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'int', nullable: false })
    songs: number;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @Column({ type: 'enum', enum: State, default: State.ACTIVE })
    state: State;

    @Column({ type: 'enum', enum: Type, default: Type.PUBLIC })
    type: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.playlists)
    user: User;

}