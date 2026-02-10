import sql from "../connection";
import { signJWT } from "../jwt";

export class User {
    id: number;
    pseudo: string;
    email: string;
    password: string;

    private table: string = "user";

    constructor(id: number, pseudo: string, email: string, password: string) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
    }

    async login(email: string, password: string) {
        const resp = await sql`SELECT * FROM ${this.table} WHERE mail = ${email} AND password = ${password}`;
        if (resp.length === 0) {
            return null;
        }
        const token = signJWT({ id: resp[0].id, email: resp[0].email });
        return { token, resp };
    }

    async insertUser(user: User) {
        console.log(this.table)
        const users = await sql`
            INSERT INTO ${this.table} ("pseudo", "mail", "password")
            VALUES (${user.pseudo}, ${user.email}, ${user.password})
        `;
        return users;
    }

}