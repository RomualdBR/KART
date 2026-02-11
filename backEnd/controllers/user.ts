import { Request, Response } from "express";
import sql from "../connection";
import { verifyJWT } from "../jwt";

export async function getUser(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.replace("Bearer ", "");
    const { id } = verifyJWT(token);

    const idToSearch = req.params.id 
    ? Number(req.params.id) 
    : id;

    const result = await sql`
      SELECT * FROM "user"
      WHERE id = ${idToSearch}
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}


export async function getLoggedUserInfo(req: Request, res: Response) {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.replace("Bearer ", "");
    const { id } = verifyJWT(token);

    const result = await sql`
      SELECT * FROM "user"
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(result[0]);

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}