/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Song } from "./song.entity";


@Entity()
export class SongToPlaylist {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.songToPlaylist)
    user: User;

    @ManyToOne(() => Song, (song) => song.songToPlaylist)
    song: Song;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    added: Date;

}