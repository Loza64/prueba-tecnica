import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/data/entity/playlist.entity';
import { User } from 'src/data/entity/user.entity';
import { SongToPlaylist } from 'src/data/entity/song_to_playlist.entity';
import { Song } from 'src/data/entity/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, User, SongToPlaylist, Playlist, Song]),
    AuthModule,
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
