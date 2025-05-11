/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ArtistDto } from 'src/data/dto/artista.dto';
import { ArtistaService } from './artista.service';
import { AlbumDto } from 'src/data/dto/album.dto';

@Controller('artist')
export class ArtistaController {

    constructor(private service: ArtistaService) { }

    @Post("save")
    async saveArtis(@Body() body: ArtistDto, @Res() res: Response) {
        const artist = await this.service.saveArtist(body);
        return res.status(200).json({ state: "succes", message: "artist upload succes", artist });
    }

    @Get("list")
    async getList(@Res() res: Response) {
        const list = await this.service.getArtists();
        return res.status(200).json({ state: "succes", message: "list artist", list });
    }

    @Post("save/album")
    async saveAlbum(@Query("artist") artist: number, @Body() body: AlbumDto, @Res() res: Response) {
        const album = await this.service.saveAlbum(artist, body);
        return res.status(200).json({ state: "succes", message: "album save succes", album });
    }

}
