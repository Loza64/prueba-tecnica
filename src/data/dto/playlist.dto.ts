/* eslint-disable prettier/prettier */
import { IsEnum, IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PlaylistState {
    DELETED = 'deleted',
    ACTIVE = 'active',
}

export enum PlaylistVisibility {
    PRIVATE = 'private',
    PUBLIC = 'public',
}

export class PlaylistDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
    @Transform(({ value }: { value: string | undefined }) => value?.trim())
    title?: string;

    @IsString()
    @MaxLength(500, { message: 'Description cannot be longer than 500 characters' })
    @Transform(({ value }: { value: string | null }) => (value ? value.trim() : null))
    description?: string | null;


    @IsEnum(PlaylistVisibility, { message: 'Visibility must be one of: private, public' })
    type?: PlaylistVisibility;
}