/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/data/entity/user.entity';
import { LoginUserDto, SignUpDto } from 'src/data/dto/user.dto';
import { FollowArtist } from 'src/data/entity/follow_artist.entity';
import { FavoriteSongs } from 'src/data/entity/favorite_songs.entity';
import { FavoriteAlbums } from 'src/data/entity/favorite_albums.entity';
import { Artist } from 'src/data/entity/artista.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Artist) private artistRepo: Repository<Artist>,
        @InjectRepository(FollowArtist) private followRepo: Repository<FollowArtist>,
        @InjectRepository(FavoriteSongs) private favoriteSongRepo: Repository<FavoriteSongs>,
        @InjectRepository(FavoriteAlbums) private favoriteAlbumsRepo: Repository<FavoriteAlbums>,
        private token: AuthService) { }

    async signUp(body: SignUpDto) {
        try {
            const user = this.userRepo.create(body);
            return await this.userRepo.save(user);;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException('Error interno del servidor al subir el mensaje: ' + errorMessage);
        }
    }

    async login(body: LoginUserDto) {
        try {
            const user = await this.userRepo.findOne({
                where: { email: body.email },
                select: ['id', 'username', 'type', 'premiumExpiresAt', 'password']
            });

            if (!user || !(await bcrypt.compare(body.password, user.password))) {
                return null;
            }

            const payload = { ...user, password: undefined }

            return this.token.generateToken(payload)

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getById(id: number) {
        try {
            return await this.userRepo.findOne({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async followArtist(idArtist: number, idUser: number) {
        try {
            const findArtist = await this.artistRepo.findOne({ where: { id: idArtist } })
            const getuser = await this.getById(idUser)
            if (!findArtist) {
                throw new NotFoundException("artista no encontrado")
            }
            if (!getuser) {
                throw new NotFoundException("usuario no encontrado")
            }

            const follow = this.followRepo.create({ artist: findArtist, user: getuser })
            await this.followRepo.save(follow)

            return true
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
