import sql from "../connection";
import { Request, Response } from "express";

export async function createComment(req: Request, res: Response) {


    const content: string = req.body?.["content"];
    const post_id: number = req.body?.["post_id"];
    const user_id: number = req.body?.["user_id"];

    console.log(content, post_id, user_id, "content, post_id, user_id");


    const comment = await sql`INSERT INTO post_comment (content, post_id, user_id) VALUES (${content}, ${post_id}, ${user_id}) RETURNING *`;

    res.json(comment);
}

export async function getComments(req: Request, res: Response) {
    const post_id: number = Number(req.query?.["post_id"]);
    console.log(post_id);


    const result = await sql`SELECT * FROM post_comment JOIN "user" ON post_comment.user_id = "user".id WHERE post_comment.post_id = ${post_id}`;
    res.json(result);
}