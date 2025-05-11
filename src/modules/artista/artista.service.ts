/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { AlbumDto } from 'src/data/dto/album.dto';
import { ArtistDto } from 'src/data/dto/artista.dto';
import { Album } from 'src/data/entity/album.entity';
import { Artist } from 'src/data/entity/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistaService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
        @InjectRepository(Album) private albumRepository: Repository<Album>,
    ) { }


    async getArtists() {
        try {
            return instanceToPlain(
                await this.artistRepository
                    .createQueryBuilder('artist')
                    .leftJoinAndSelect('artist.followers', 'followers')
                    .leftJoinAndSelect('followers.user', 'user')
                    .getMany()
            )
        } catch (error: any) {
            throw new Error("Error al mostrar los artistas")
        }
    }

    async saveArtist(data: ArtistDto) {
        try {
            const artist = this.artistRepository.create(data)
            return await this.artistRepository.save(artist);
        } catch (error: any) {
            throw new Error("Error al mostrar los artistas")
        }
    }

    async saveAlbum(idArtist: number, dto: AlbumDto) {
        try {
            const getArtist = await this.artistRepository.findOne({ where: { id: idArtist } })
            if (!getArtist) {
                throw new Error("El artista no existe");
            }
            const album = this.albumRepository.create({ ...dto, artist: getArtist });
            return await this.albumRepository.save(album);

        } catch (error: any) {
            throw new Error("Error al guardar el album")
        }
    }

}
