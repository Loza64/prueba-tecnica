/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistDto } from 'src/data/dto/playlist.dto';
import { Playlist, PlaylistState, PlaylistVisibility } from 'src/data/entity/playlist.entity';
import { Song } from 'src/data/entity/song.entity';
import { SongToPlaylist } from 'src/data/entity/song_to_playlist.entity';
import { User } from 'src/data/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Song) private songRepo: Repository<Song>,
        @InjectRepository(SongToPlaylist) private stpRepo: Repository<SongToPlaylist>
    ) { }

    async savePlaylist(userId: number, data: PlaylistDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } })
            if (!user) {
                throw new Error("User not found")
            }
            const create = this.playlistRepo.create({ ...data, createdBy: user })
            await this.playlistRepo.save(create);
            return true
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    async getPlaylist() {
        return await this.playlistRepo.find({
            where: { state: PlaylistState.ACTIVE }
        });
    }

    async songToPlayList(idPlayList: number, idUser: number, idSong: number) {
        const playlist = await this.playlistRepo.findOne({ where: { id: idPlayList }, relations: ['createdBy'] })
        const addedBy = await this.userRepo.findOne({ where: { id: idUser } })
        const song = await this.songRepo.findOne({ where: { id: idSong } })

        if (!playlist) {
            throw new Error("Playlist not found")
        }

        if (!addedBy) {
            throw new Error("User not found")
        }

        if (playlist.state === PlaylistState.DELETED) {
            throw new Error("Playlist must be active")
        }

        if (playlist.type === PlaylistVisibility.PRIVATE && playlist.createdBy.id !== idUser) {
            throw new Error("Playlist is private")
        }

        if (!song) {
            throw new Error("Song not found")
        }

        const create = this.stpRepo.create({ addedBy, playlist, song })
        await this.stpRepo.save(create);
        return true;

    }
}
