/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenData } from 'src/auth/payload.token';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("TOKEN_SECRET") || (() => { throw new Error("TOKEN_SECRET is not defined in the configuration"); })(),
        })
    }

    validate(payload: TokenData): TokenData {

        const now = Math.floor(Date.now() / 1000);
        const tokenAge = now - payload.iat;
        const MAX_TOKEN_AGE = 6 * 60 * 60;

        if (tokenAge > MAX_TOKEN_AGE) {
            throw new UnauthorizedException('Sesión expirada (máximo 6 horas)');
        }

        if (!['free', 'premium'].includes(payload.type)) {
            throw new UnauthorizedException('Tipo de usuario no reconocido');
        }

        if (payload.type === 'premium' && (!payload.premiumExpiresAt || new Date(payload.premiumExpiresAt) < new Date())) {
            throw new ForbiddenException('Membresía premium expirada, renueve la sesión');
        }

        console.log(payload)
        return payload;
    }
}