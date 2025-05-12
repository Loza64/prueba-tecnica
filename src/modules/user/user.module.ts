/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/data/entity/user.entity';
import { FollowArtist } from 'src/data/entity/follow_artist.entity';
import { FavoriteAlbums } from 'src/data/entity/favorite_albums.entity';
import { FavoriteSongs } from 'src/data/entity/favorite_songs.entity';
import { Artist } from 'src/data/entity/artista.entity';
import { Album } from 'src/data/entity/album.entity';
import { Song } from 'src/data/entity/song.entity';
import { Pays } from 'src/data/entity/pays.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Artist, FollowArtist, Album, FavoriteAlbums, Song, FavoriteSongs, Pays]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
