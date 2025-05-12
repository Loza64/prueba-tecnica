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
import { Song } from 'src/data/entity/song.entity';
import { Album } from 'src/data/entity/album.entity';
import { Pays } from 'src/data/entity/pays.entity';
import { UserRole } from 'src/data/entity/user.entity';
import { PayDto } from 'src/data/dto/pay.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Artist) private artistRepo: Repository<Artist>,
        @InjectRepository(FollowArtist) private followRepo: Repository<FollowArtist>,
        @InjectRepository(Song) private songRepo: Repository<Song>,
        @InjectRepository(FavoriteSongs) private favoriteSongRepo: Repository<FavoriteSongs>,
        @InjectRepository(Album) private albumRepo: Repository<Album>,
        @InjectRepository(FavoriteAlbums) private favoriteAlbumsRepo: Repository<FavoriteAlbums>,
        @InjectRepository(Pays) private paysRepo: Repository<Pays>,
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

            const user = await this.userRepo.findOne({
                where: { id }, relations: [
                    'playlists',
                    'songToPlaylist',
                    'favoriteSongs',
                    'favoriteSongs.song',
                    'favoriteAlbums',
                    'favoriteAlbums.album',
                    'following',
                    'following.artist',
                    'pays'
                ]
            })

            if (!user) throw new Error('User not found');

            return user
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async followArtist(idArtist: number, idUser: number) {
        try {
            const findArtist = await this.artistRepo.findOne({ where: { id: idArtist } })
            const getuser = await this.userRepo.findOne({ where: { id: idUser } })
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

    async favoriteSong(idSong: number, idUser: number) {
        try {
            const song = await this.songRepo.findOne({ where: { id: idSong } })
            const user = await this.userRepo.findOne({ where: { id: idUser } })

            if (!song) {
                throw new Error("Album not found")
            }

            if (!user) {
                throw new Error("User no fount")
            }

            const create = this.favoriteSongRepo.create({ song, user })
            await this.favoriteSongRepo.save(create);
            return true
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async favoriteAlbum(idlbum: number, idUser: number) {
        try {
            const album = await this.albumRepo.findOne({ where: { id: idlbum } })
            const user = await this.userRepo.findOne({ where: { id: idUser } })

            if (!album) {
                throw new Error("Album not found")
            }

            if (!user) {
                throw new Error("User no fount")
            }

            const create = this.favoriteAlbumsRepo.create({ album, user })
            await this.favoriteAlbumsRepo.save(create)
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async genarePay(iduser: number, dto: PayDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: iduser } })
            if (!user) {
                throw new NotFoundException("User not found");
            }
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + 4);

            user.payMethod = dto.method
            user.type = UserRole.PREMIUM;
            user.premiumExpiresAt = currentDate;
            
            const create = this.paysRepo.create({ user });
            await this.paysRepo.save(create);
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
