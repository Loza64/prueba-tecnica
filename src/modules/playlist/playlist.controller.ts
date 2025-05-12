/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Headers, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PlaylistService } from './playlist.service';
import { PlaylistDto } from 'src/data/dto/playlist.dto';
import { JwtAuthGuard } from 'src/auth/strategies/authguard/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { TokenBody } from 'src/auth/payload.token';

@Controller('playlist')
export class PlaylistController {

    constructor(private service: PlaylistService, private jwt: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Post("create/mine")
    async createMyPlaylist(@Body() dto: PlaylistDto, @Res() res: Response, @Headers('authorization') header: string) {
        const token = header.replace('Bearer ', '');
        const data = this.jwt.verifyToken(token);
        if (!data) {
            return res.status(401).json({ state: "error", message: "token expired" });
        }
        const upload = await this.service.savePlaylist(data.id, dto)

        if (upload) {
            return res.status(201).json({ state: "succes", message: "playlist upload succes" });
        }
    }

    @Get("/list")
    async getPlaylist(@Res() res: Response) {
        const list = await this.service.getPlaylist();
        return res.status(200).json(list);
    }

    @UseGuards(JwtAuthGuard)
    @Get("save/music")
    async songToPlaylist(@Res() res: Response, @Query("song") song: number, @Query("playlist") playlist: number, @Headers('authorization') header: string) {
        const token = header.replace('Bearer ', '');
        const data = this.jwt.verifyToken(token) as TokenBody;

        const save = await this.service.songToPlayList(playlist, data.id, song)

        if (save) {
            return res.status(201).json({ state: "succes", message: "song save to playlist" });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    async deletePlaylist(@Res() res: Response, @Query("id") playlist: number, @Headers('authorization') header: string) {
        const token = header.replace('Bearer ', '');
        const data = this.jwt.verifyToken(token) as TokenBody;
        const result = await this.service.deletePlaylist(playlist, data.id)
        if (result) {
            return res.status(200).json({ state: "succes", message: "playlist deleted" });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("restore")
    async restorePlaylist(@Res() res: Response, @Query("id") playlist: number, @Headers('authorization') header: string) {
        const token = header.replace('Bearer ', '');
        const data = this.jwt.verifyToken(token) as TokenBody;
        const result = await this.service.restorePlaylist(playlist, data.id)
        if (result) {
            return res.status(200).json({ state: "succes", message: "playlist restored" });
        }
    }
}
