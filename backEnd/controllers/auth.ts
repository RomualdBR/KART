import { Request, Response } from "express";
import { User } from "../models/user";
import sql from "../connection";

export async function userLogin(req: Request, res: Response) {

    const email: string = req.query["email"] as string;
    const password: string = req.query["password"] as string;

    const user = new User(0, "", email, password);
    const result = await user.login(email, password);
    if (!result) {
        res.json({ message: "invalid email or password" });
        return;
    }

    res.json(result);
}

export async function userRegister(req: Request, res: Response) {
    const pseudo: string = req.body["pseudo"];
    const email: string = req.body["email"];
    const password: string = req.body["password"];

    const result = await sql`
        INSERT INTO "user" ("pseudo", "mail", "password")
        VALUES (${pseudo}, ${email}, ${password})
        RETURNING id
    `

    console.log(result)

    if (!result) {
        res.json({ message: "invalid email or password" });
        return;
    }

    res.json(result);
}