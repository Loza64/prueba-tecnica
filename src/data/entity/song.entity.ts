/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { FavoriteSongs } from './favorite_songs.entity';
import { SongToPlaylist } from './song_to_playlist.entity';

@Entity({ name: 'songs' })
export class Song {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    durationInMinutes: number;

    @Column({ type: 'int', default: 0, nullable: false })
    reproductions: number;

    @ManyToOne(() => Album, (album) => album.songs)
    album: Album;

    @OneToMany(() => FavoriteSongs, (favoriteSongs) => favoriteSongs.song, { cascade: true })
    favoriteSongs: FavoriteSongs[];

    @OneToMany(() => SongToPlaylist, (songToPlaylist) => songToPlaylist.song, { cascade: true })
    songToPlaylist: SongToPlaylist[];
}