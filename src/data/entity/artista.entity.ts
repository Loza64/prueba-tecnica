/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';

@Entity('artists')

export class Artist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    image: string;

    @OneToMany(() => Album, (album) => album.artist)
    albums: Album[];

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