/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, SignUpDto } from '../dto/user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/strategies/authguard/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { TokenData } from 'src/auth/payload.token';

@Controller('user')
export class UserController {

    constructor(private service: UserService, private jwt: AuthService) { }

    @Post("/login")
    async login(@Body() body: LoginUserDto, @Res() res: Response) {
        const response = await this.service.login(body)

        if (!response) {
            return res.status(401).json({ state: "error", message: "password or email incorrect" });
        }

        return res.status(200).json({ state: "succes", message: "login success", token: response });

    }

    @Post("/signup")
    async signup(@Body() body: SignUpDto, @Res() res: Response) {
        const response = await this.service.signUp(body)

        if (!response) {
            return res.status(401).json({ state: "error", message: "error to signup" });
        }

        return res.status(201).json({ state: "succes", message: "signup succes" });

    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    profile(@Req() req: Request, @Res() res: Response, @Headers('authorization') header: string) {
        const token = header?.replace('Bearer ', '');
        const data = this.jwt.verifyToken(token) as TokenData
        return res.status(200).json({ state: "succes", message: "access authorized", profile: data });
    }

}
