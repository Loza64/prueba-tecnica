/* eslint-disable prettier/prettier */
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Album } from "./album.entity";
import { User } from "./user.entity";

@Entity({ name: 'favorite_albums' })
export class FavoriteAlbums {
    @PrimaryColumn({ type: 'int' })
    user_id: number;

    @PrimaryColumn({ type: 'int' })
    album_id: number;

    @ManyToOne(() => Album, (album) => album.favoriteAlbums)
    @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
    album: Album;

    @ManyToOne(() => User, (user) => user.favoriteAlbums)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}