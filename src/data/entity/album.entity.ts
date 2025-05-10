/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artista.entity';
import { Song } from './song.entity';
import { FavoriteAlbums } from './favorite_albums.entity';


@Entity({ name: 'albums' })
export class Album {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    title: string;


    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    year_date: Date;

    @Column({ type: 'varchar', length: 300, nullable: true })
    image: string;

    @ManyToOne(() => Artist, (artist) => artist.albums)
    artist: Artist;

    @OneToMany(() => Song, (song) => song.album)
    songs: Song[];

    @OneToMany(() => FavoriteAlbums, (favoriteAlbums) => favoriteAlbums.album)
    favoriteAlbums: FavoriteAlbums[];

}