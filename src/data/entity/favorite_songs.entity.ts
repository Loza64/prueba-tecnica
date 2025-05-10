/* eslint-disable prettier/prettier */

import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Song } from './song.entity';

@Entity({ name: 'favorite_songs' })
export class FavoriteSongs {

    @PrimaryColumn({ type: 'int' })
    user_id: number;

    @PrimaryColumn({ type: 'int' })
    song_id: number;

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(() => User, (user) => user.favoriteSongs)
    user: User;

    @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
    @ManyToOne(() => Song, (song) => song.favoriteSongs)
    song: Song;

}