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
        secret: config.get<string>('TOKEN_SECRET'),
        signOptions: {
          expiresIn: '6h',
          issuer: 'app-name',
          audience: ['web', 'mobile'],
          algorithm: 'HS256',
        },
        verifyOptions: {
          ignoreExpiration: false,
          clockTolerance: 30,
          algorithms: ['HS256','ES256', 'ES512', 'HS384', 'PS384', 'PS512'],
        }
      }),
    }),
  ],
  providers: [AuthService, JwtPassportStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule { }
