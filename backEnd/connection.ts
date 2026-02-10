import postgres from "postgres"

// const databaseUrl = process.env.DATABASE_URL

// if (!databaseUrl) throw Error("No variable in .env")

const sql = postgres("postgresql://postgres:zjhbwwrT6jcV759@localhost:5432/KART");

export default sql