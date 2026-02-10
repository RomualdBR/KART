import { Request, Response } from "express";
import sql from "../connection";
import { signJWT } from "../jwt";

export async function userLogin(req: Request, res: Response) {

    const email: string = req.query["email"] as string;
    const password: string = req.query["password"] as string;   

    const resp = await sql`SELECT * FROM "user" WHERE mail = ${email} AND password = ${password}`;
    if (!resp) {
        res.json({ message: "invalid email or password" });
        return;
    }

    const token = signJWT({ id: resp[0].id, email: resp[0].email });
    res.json({ token, resp });
}

export async function userRegister(req: Request, res: Response) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    const pseudo: string = req.body["pseudo"];
    const email: string = req.body["email"];
    const password: string = req.body["password"];

    if(!passwordRegex.test(password)) {
        res.json({ 
            message: 
            "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un symbole." 
        });
        return;
    }

    const result = await sql`
        INSERT INTO "user" ("pseudo", "mail", "password")
        VALUES (${pseudo}, ${email}, ${password})
        RETURNING id
    `
    if (!result) {
        res.json({ message: "invalid email or password" });
        return;
    }

    const token = signJWT({ id: result[0].id, email: result[0].email });
    res.json({ token, result });
}