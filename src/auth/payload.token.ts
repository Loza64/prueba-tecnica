/* eslint-disable prettier/prettier */
export interface TokenBody {
    id: number,
    username: string,
    type: string,
    premiumExpiresAt?: Date,
}

export interface TokenData {
    id: number,
    username: string,
    type: string,
    premiumExpiresAt?: Date,
    iat: number,
    exp: number,
    aud: Array<string>,
    iss: string
}