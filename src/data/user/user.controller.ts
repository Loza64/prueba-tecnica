/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, SignUpDto } from '../dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }


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

        return res.status(401).json({ state: "succes", message: "signup succes success" });

    }

}
