import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/data/entity/song.entity';
import { Album } from 'src/data/entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Album])],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}
