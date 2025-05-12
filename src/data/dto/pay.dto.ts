/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, Max, Min } from 'class-validator';

export enum Pay {
    PAYPAL = 'paypal',
    CARD = 'card'
}

export class PayDto {
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01, { message: 'el pago debe ser de 10$US en adelante' })
    @Max(30, { message: 'el pago no debe ser mayor a 30$ US' })
    @Transform(({ value }) => {
        const num = parseFloat(value);
        return isNaN(num) ? NaN : parseFloat(num.toFixed(2));
    })
    amount: number;

    @IsEnum(Pay, { message: 'El método de pago debe ser PayPal o Tarjeta' })
    method: Pay;
}