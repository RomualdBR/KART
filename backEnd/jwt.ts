import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export function signJWT(payload: any) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

