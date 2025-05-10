/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtPassportStrategy } from './strategies/passportstrategy/jwt.passportstrategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: { expiresIn: '120m' },
      }),
    }),
  ],
  providers: [AuthService, JwtPassportStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule { }
