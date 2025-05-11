import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/data/entity/artista.entity';
import { Album } from 'src/data/entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album])],
  providers: [ArtistaService],
  controllers: [ArtistaController],
})
export class ArtistaModule {}
