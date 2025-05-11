/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistaModule } from './modules/artista/artista.module';
import { PaysModule } from './modules/pays/pays.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SongModule } from './modules/song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true',
    }),
    UserModule,
    AlbumModule,
    ArtistaModule,
    PaysModule,
    PlaylistModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
