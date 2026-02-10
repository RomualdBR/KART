import { Request, Response } from "express";
import sql from "../connection";

export async function createPost(req: Request, res: Response) {
	const content: string = req.body["content"];

	const result = await sql`
        WITH inserted_post AS (
			INSERT INTO post (content, user_id)
			VALUES (${content}, ${4})
			RETURNING *
		)
		SELECT "user".pseudo, inserted_post.*
		FROM inserted_post
		JOIN "user"
			ON "user".id = inserted_post.user_id
    `;

	res.json(result[0]);
}

export async function getPosts(req: Request, res: Response) {
	const offset = Number(req.query["offset"]) || 0;
	const limit = Number(req.query["limit"]) || 5;

	const result = await sql`
        SELECT "user".pseudo, post.*
        FROM post
        JOIN "user"
            ON "user".id = post.user_id
        ORDER BY post.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
    `;

	res.json(result);
}
