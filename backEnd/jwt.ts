import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export function signJWT(payload: any) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

