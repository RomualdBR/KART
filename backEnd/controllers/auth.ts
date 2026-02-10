import { Request, Response } from "express";
import sql from "../connection";
import { signJWT } from "../jwt";

export async function userLogin(req: Request, res: Response) {

    const mail: string = req.query["mail"] as string;
    const password: string = req.query["password"] as string;   

    const resp = await sql`SELECT * FROM "user" WHERE mail = ${mail} AND password = ${password}`;
    if (!resp) {
        res.json({ message: "invalid mail or password" });
        return;
    }

    const token = signJWT({ id: resp[0].id, mail: resp[0].mail });
    res.json({ token, resp });
}

export async function userRegister(req: Request, res: Response) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    const pseudo: string = req.body["pseudo"];
    const mail: string = req.body["mail"];
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
        VALUES (${pseudo}, ${mail}, ${password})
        RETURNING id
    `
    if (!result) {
        res.json({ message: "invalid mail or password" });
        return;
    }

    const token = signJWT({ id: result[0].id, mail: result[0].mail });
    res.json({ token, result });
}