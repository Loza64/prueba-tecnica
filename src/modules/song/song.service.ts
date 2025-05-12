/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDto } from 'src/data/dto/song.dto';
import { Album } from 'src/data/entity/album.entity';
import { Song } from 'src/data/entity/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song) private songRpository: Repository<Song>,
        @InjectRepository(Album) private albumRepository: Repository<Album>
    ) { }

    async getSongs(album?: number) {
        try {
            return await this.songRpository.find(
                {
                    select: ['id', 'title', 'durationInMinutes', 'reproductions'],
                    where: { id_album: album }
                }
            );
        } catch {
            throw new Error("Error to show songs")
        }
    }

    async saveSong(idAlbum: number, song: SongDto) {
        try {
            const album = await this.albumRepository.findOne({ where: { id: idAlbum } })
            if (!album) {
                throw new Error("Album not found");
            }
            const create = this.songRpository.create({ ...song, album });
            const save = await this.songRpository.save(create);
            return save;
        } catch {
            throw new Error("Error to save songs")
        }
    }

    async listen(song: number) {
        try {
            const result = await this.songRpository.update(
                { id: song },
                { reproductions: () => "reproductions + 1" }
            );

            if (result.affected === 0) {
                throw new Error("Song not found");
            }

            const updatedSong = await this.songRpository.findOne({ where: { id: song } });
            return updatedSong;
        } catch {
            throw new Error("Error to listen songs")
        }
    }
}
