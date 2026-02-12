import sql from "../connection";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export async function createComment(req: Request, res: Response) {
  const content: string = req.body?.["content"];
  const post_id: number = req.body?.["post_id"];

  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token");

  const jwt = authHeader.replace("Bearer ", "");

  const { id: connectedUserId } = jsonwebtoken.verify(
    jwt,
    process.env.SECRET_KEY as string,
  ) as { id: number };

  const comment =
    await sql`INSERT INTO post_comment (content, post_id, user_id) VALUES (${content}, ${post_id}, ${connectedUserId}) RETURNING *`;

  res.json(comment);
}

export async function getComments(req: Request, res: Response) {
  const post_id: number = Number(req.query?.["post_id"]);
  console.log(post_id);

  const result =
    await sql`SELECT * FROM post_comment JOIN "user" ON post_comment.user_id = "user".id WHERE post_comment.post_id = ${post_id}`;
  res.json(result);
}
