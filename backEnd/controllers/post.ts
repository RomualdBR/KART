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

export async function getPosts(req: Request, res: Response) {
    const offset = Number(req.query["offset"]) || 0;
    const limit = Number(req.query["limit"]) || 5;

	const result = await sql`
        SELECT * FROM post
        LIMIT ${limit}
        OFFSET ${offset}
    `;

	res.json(result);
}
