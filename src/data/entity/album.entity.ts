/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artista.entity';
import { Song } from './song.entity';
import { FavoriteAlbums } from './favorite_albums.entity';


@Entity({ name: 'albums' })
export class Album {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title: string;


    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    year_date: Date;

    @Column({ type: 'varchar', length: 300, nullable: false })
    image: string;

    @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE', nullable: true })
    artist: Artist;

    @OneToMany(() => Song, (song) => song.album, { cascade: true })
    songs: Song[];

    @OneToMany(() => FavoriteAlbums, (favoriteAlbums) => favoriteAlbums.album, { cascade: true })
    favoriteAlbums: FavoriteAlbums[];

}