import { Request, Response } from "express";
import sql from "../connection";

export async function createPost(req: Request, res: Response) {
	const content: string = req.body["content"];

	const result = await sql`
        INSERT INTO "post" ("content", "user_id")
        VALUES (${content}, ${4})
        RETURNING id
    `;

	res.json(result);
}

export async function getPosts(_req: Request, res: Response) {
	const result = await sql`
        SELECT * FROM post
    `;

	res.json(result);
}
