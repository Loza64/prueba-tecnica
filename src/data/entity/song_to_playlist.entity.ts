/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Song } from "./song.entity";
import { Playlist } from "./playlist.entity";
import { User } from "./user.entity";

@Entity()
export class SongToPlaylist {

    @PrimaryColumn({ name: 'song_id' })
    songId!: number;

    @PrimaryColumn({ name: 'playlist_id' })
    playlistId!: number;

    @ManyToOne(() => Song, (song) => song.songToPlaylist, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'song_id', referencedColumnName: 'id' })
    song!: Song;

    @ManyToOne(() => Playlist, (playlist) => playlist.songs, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
    playlist!: Playlist | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    addedBy!: User;

    @Column({ name: 'added_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    addedAt!: Date;

}