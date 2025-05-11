/* eslint-disable prettier/prettier */
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Album } from "./album.entity";
import { User } from "./user.entity";

@Entity({ name: 'favorite_albums' })
export class FavoriteAlbums {
    @PrimaryColumn({ type: 'int' })
    user_id!: number;

    @PrimaryColumn({ type: 'int' })
    album_id!: number;

    @ManyToOne(() => Album, (album) => album.favoriteAlbums, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
    album: Album;

    @ManyToOne(() => User, (user) => user.favoriteAlbums, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}