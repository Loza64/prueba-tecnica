/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUrl, Length, Matches} from "class-validator";

export class ArtistDto{
    @IsString()
    @IsNotEmpty()
    @Length(2, 255, {
        message: 'El nombre debe tener entre 2 y 255 caracteres',
    })
    @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]+$/, {
        message: 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos',
    })
    name: string;

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