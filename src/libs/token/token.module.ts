/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("TOKEN_SECRET"),
        signOptions: { expiresIn: '120m' },
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule { }
