/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IsString, IsEmail, IsDate, IsEnum, IsInt, IsOptional, IsNotEmpty, MinLength, MaxLength, Matches} from 'class-validator';

import { Type } from 'class-transformer';
import { Gender } from '../entity/user.entity';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username solo puede contener letras, números y guiones bajos',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @IsInt()
  @IsNotEmpty()
  postalCode: number;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthdate: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-()]+$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
  })
  password: string;
}



export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}