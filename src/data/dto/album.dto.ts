/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsOptional, IsUrl, Matches } from 'class-validator';

export class AlbumDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    year_date?: Date;

    @IsString()
    @IsNotEmpty()
    @IsUrl(
        {
            require_protocol: true,
            require_valid_protocol: true,
        },
        {
            message: 'La imagen debe ser una URL válida con protocolo (http/https)',
        }
    )
    @Matches(/\.(jpg|jpeg|png|gif|webp|svg)$/i, {
        message: 'La URL de la imagen debe ser un formato de imagen válido (jpg, jpeg, png, gif, webp, svg)',
    })
    image: string;

}