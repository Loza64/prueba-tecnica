/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { SongService } from './song.service';
import { Response } from 'express';
import { SongDto } from 'src/data/dto/song.dto';

@Controller('song')
export class SongController {
    constructor(private service: SongService) { }

    @Get("/list")
    async getSong(@Res() res: Response, @Query("album") album?: number) {
        const list = await this.service.getSongs(album);
        if (list.length > 0) {
            return res.status(200).json(list);
        }

        return res.status(404).json({ state: "error", mesage: "songs not found" })
    }

    @Post("save")
    async saveSong(@Body() dto: SongDto, @Query("album") album: number, @Res() res: Response) {
        const song = await this.service.saveSong(album, dto);
        return res.status(201).json({ state: "succes", mesage: "Song save succes", save: song })
    }
}
