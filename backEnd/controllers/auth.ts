import { Request, Response } from "express";
import sql from "../connection";
import { signJWT } from "../jwt";
import bcrypt from "bcrypt";

export async function userLogin(req: Request, res: Response) {
  const { mail, password } = req.body;

  const resp = await sql`
        SELECT id, mail, password
        FROM "user"
        WHERE mail = ${mail}
    `;

  if (!resp.length) {
    res.status(401).json({ message: "Invalid mail or password" });
    return;
  }

  const user = resp[0];

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid mail or password" });
    return;
  }

  const token = signJWT({ id: user.id, mail: user.mail });
  res.json({ token, id: user.id });
}

export async function userRegister(req: Request, res: Response) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
  const { pseudo, mail, password } = req.body;

  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un symbole.",
    });
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await sql`
        INSERT INTO "user" ("pseudo", "mail", "password")
        VALUES (${pseudo}, ${mail}, ${hashedPassword})
        RETURNING id, mail
    `;

  if (!result.length) {
    res.status(400).json({ message: "Erreur lors de l'inscription" });
    return;
  }

  const token = signJWT({ id: result[0].id, mail: result[0].mail });
  res.json({ token, id: result[0].id });
}
