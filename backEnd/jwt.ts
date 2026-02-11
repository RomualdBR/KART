import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userInfo } from 'node:os';
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export function signJWT(payload: any) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyJWT(token: string): { id: number } {
  try {
    return jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as { id: number };
  } catch {
    throw new Error("Invalid token");
  }
}


