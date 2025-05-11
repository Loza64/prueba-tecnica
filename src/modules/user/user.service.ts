/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto, LoginUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>, private token: AuthService) { }

    async signUp(body: SignUpDto) {
        try {
            const user = this.repository.create(body);
            return await this.repository.save(user);;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException('Error interno del servidor al subir el mensaje: ' + errorMessage);
        }
    }

    async login(body: LoginUserDto) {
        try {
            const user = await this.repository.findOne({
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

}
