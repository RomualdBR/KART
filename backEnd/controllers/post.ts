import { Request, Response } from "express";
import sql from "../connection";
import jsonwebtoken from "jsonwebtoken";

export async function createPost(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);
  if (!authHeader) throw new Error("No token");

  const jwt = authHeader.replace("Bearer ", "");

  const { id } = jsonwebtoken.verify(jwt, process.env.SECRET_KEY as string) as {
    id: number;
  };
  const content: string = req.body["content"];

  const result = await sql`
        WITH inserted_post AS (
			INSERT INTO post (content, user_id)
			VALUES (${content}, ${id})
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
  const user_id = Number(req.query["user_id"]) || undefined;

  const result = await sql`
        SELECT "user".pseudo, "user".id, post.*
        FROM post
        JOIN "user"
            ON "user".id = post.user_id
        ${user_id ? sql`WHERE post.user_id = ${user_id}` : sql``}
        ORDER BY post.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
    `;

  res.json(result);
}
