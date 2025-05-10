/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FavoriteSongs } from './favorite_songs.entity';
import { Pays } from './pays.entity';
import { Playlist } from './playlist.entity';
import { SongToPlaylist } from './song_to_playlist.entity';


export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    country: string;

    @Column({ type: 'int' })
    postalCode: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'date', nullable: false })
    birthdate: Date;

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender;

    @Column({ type: 'datetime', default: null, nullable: true })
    premiumExpiresAt: Date;

    @Column({ type: 'varchar', select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @OneToMany(() => Playlist, (playlists) => playlists.user)
    playlists: Playlist[];

    @OneToMany(() => SongToPlaylist, (songToPlaylist) => songToPlaylist.user)
    songToPlaylist: SongToPlaylist[];

    @OneToMany(() => FavoriteSongs, (favoriteSongs) => favoriteSongs.user)
    favoriteSongs: FavoriteSongs[];

    @OneToMany(() => FavoriteSongs, (favoriteSongs) => favoriteSongs.song)
    favoriteAlbums: FavoriteSongs[];

    @OneToMany(() => Pays, (pays) => pays.user)
    pays: Pays[];

}