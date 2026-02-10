import { Request, Response } from "express";
import sql from "../connection";
import jsonwebtoken from "jsonwebtoken";

export async function getConnectedUser(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("No token");

    const token = authHeader.replace("Bearer ", "");
    const { id } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: number };

    const result = await sql`
      SELECT * FROM "user"
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
