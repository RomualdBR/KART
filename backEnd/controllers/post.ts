import { Request, Response } from "express";
import { User } from "../models/user";
import sql from "../connection";

export async function createPost(req: Request, res: Response) {
    const content: string = req.body["content"];

    const result = await sql`
        INSERT INTO "post" ("content", "user_id")
        VALUES (${content}, ${4})
        RETURNING id
    `

    console.log(result)

    res.json(result);
}