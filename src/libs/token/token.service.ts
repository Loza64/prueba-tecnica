/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwt: JwtService) { }

    generateToken(payload: { id: number, username: string, premiumExpiresAt?: Date }) {
        return this.jwt.sign(payload)
    }

    verifyToken(token: string): Record<string, any> {
        return this.jwt.verify(token) as Record<string, any>;
    }
}
