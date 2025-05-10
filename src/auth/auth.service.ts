/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenBody } from './payload.token';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) { }

    generateToken(payload: TokenBody): string {
        return this.jwt.sign(payload)
    }

    verifyToken(token: string): TokenBody | null {
        try {
            return this.jwt.verify<TokenBody>(token);
        } catch {
            return null
        }
    }
}
