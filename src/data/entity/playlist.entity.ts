/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { SongToPlaylist } from './song_to_playlist.entity';

export enum PlaylistState {
    DELETED = 'deleted',
    ACTIVE = 'active',
}

export enum PlaylistVisibility {
    PRIVATE = 'private',
    PUBLIC = 'public',
}

@Entity('playlists')
@Index(['createdBy', 'state'])
export class Playlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'enum', enum: PlaylistState, default: PlaylistState.ACTIVE })
    state: PlaylistState;

    @Column({ type: 'enum', enum: PlaylistVisibility, nullable: false })
    type: PlaylistVisibility

    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE', nullable: false })
    createdBy: User;

    @OneToMany(() => SongToPlaylist, (songToPlaylist) => songToPlaylist.playlist, { cascade: true })
    songs: SongToPlaylist[];

}