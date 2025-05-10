/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
        return payload
    }
}
