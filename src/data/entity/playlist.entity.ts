/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { SongToPlaylist } from './song_to_playlist.entity';

export enum PlaylistState {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    ARCHIVED = 'archived'
}

export enum PlaylistVisibility {
    PRIVATE = 'private',
    PUBLIC = 'public',
    UNLISTED = 'unlisted'
}

@Entity('playlists')
@Index(['createdBy', 'state'])
export class Playlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({name:'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'enum', enum: PlaylistState, default: PlaylistState.ACTIVE })
    state: PlaylistState;

    @Column({ type: 'enum', enum: PlaylistVisibility, default: PlaylistVisibility.PUBLIC })
    visibility: PlaylistVisibility;

    @Column({ name: 'is_collaborative', type: 'boolean', default: false, })
    isCollaborative: boolean;

    @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    createdBy: User;

    @OneToMany(() => SongToPlaylist, (songToPlaylist) => songToPlaylist.playlist, { cascade: true })
    songs: SongToPlaylist[];

}