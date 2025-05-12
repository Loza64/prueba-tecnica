/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class SongDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'El título no puede tener más de 255 caracteres' })
  title: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.01, { message: 'La duración debe ser al menos 0.01 minutos' })
  @Max(30, { message: 'La duración no puede exceder los 30 minutos' })
  @Transform(({ value }) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : parseFloat(num.toFixed(2));
  })
  durationInMinutes: number;

  @IsNumber()
  @Min(0)
  reproductions: number;
}
