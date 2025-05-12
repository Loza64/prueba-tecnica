/* eslint-disable prettier/prettier */
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Artist } from "./artista.entity";
import { Exclude } from "class-transformer";


@Entity("follow_artist")
export class FollowArtist {
    @Exclude()
    @PrimaryColumn()
    id_user: number

    @Exclude()
    @PrimaryColumn()
    id_artist: number

    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    @ManyToOne(() => User, (user) => user.following)
    user: User;

    @JoinColumn({ name: "id_artist", referencedColumnName: "id" })
    @ManyToOne(() => Artist, (artist) => artist.followers)
    artist: Artist;
}