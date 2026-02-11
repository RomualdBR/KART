import { Request, Response } from "express";
import sql from "../connection";
import jsonwebtoken from "jsonwebtoken";
import { PendingQuery, Row } from "postgres";
import { verifyJWT } from "../jwt";

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
	const cursor = String(req.query["cursor"]);
	const limit = Number(req.query["limit"]) || 5;
	const user_id = Number(req.query["user_id"]) || undefined;

	const conditions: PendingQuery<Row[]>[] = [];

	function addToConditions(condition: PendingQuery<Row[]>) {
		if (conditions.length > 0) conditions.push(sql`AND`);
		conditions.push(condition);
	}

	if (user_id) addToConditions(sql`post.user_id = ${user_id}`);
	if (cursor) addToConditions(sql`post.created_at < ${cursor}`);

	const posts: { created_at: string }[] = await sql`
    SELECT "user".pseudo, post.*
    FROM post
    JOIN "user"
        ON "user".id = post.user_id
    ${conditions.length > 0 ? sql`WHERE ${conditions}` : sql``}
    ORDER BY post.created_at DESC
    LIMIT ${limit}
  `;

	const nextCursor = posts.length > 0 ? posts[posts.length - 1].created_at : null;

	res.json({ posts, nextCursor });
}

export async function deletePost(req: Request, res: Response) {
	const authHeader = req.headers.authorization;
	if (!authHeader) throw new Error("No token");

	const jwt = authHeader.replace("Bearer ", "");

	const { id } = verifyJWT(jwt);

	const postId = Number(req.params.id);

	const result = await sql`
		DELETE FROM post
		WHERE id = ${postId} AND user_id = ${id}
		RETURNING *
	`;

	if (result.length === 0) {
		return res.status(404).json({ message: "Post not found or not authorized" });
	}

	res.json({ message: "Post deleted successfully" });
}