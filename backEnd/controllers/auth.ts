import { Request, Response } from "express";
import { User } from "../models/user";

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

    console.log(req.query);

    const pseudo: string = req.body["pseudo"] as string;
    const email: string = req.body["email"] as string;
    const password: string = req.body["password"] as string;

    console.log(pseudo, email, password);
    const user = new User(0, pseudo, email, password);
    const result = await user.insertUser(user);
    if (!result) {
        res.json({ message: "invalid email or password" });
        return;
    }

    res.json(result);
}