/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { FollowArtist } from './follow_artist.entity';

@Entity('artists')

export class Artist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;

    @OneToMany(() => Album, (album) => album.artist, { eager: true, cascade: true })
    albums: Album[];


    @OneToMany(() => FollowArtist, (followers) => followers.artist, { eager: true, cascade: true })
    followers: FollowArtist[];


    @ManyToMany(() => Artist, (artist) => artist.relations_artists)
    @JoinTable(
        {
            name: 'artist_relations',
            joinColumn: { name: 'artist_id', referencedColumnName: 'id' },
            inverseJoinColumn: { name: 'related_artist_id', referencedColumnName: 'id' },
        }
    )
    relations_artists: Artist[];

}