import postgres from "postgres"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) throw Error("No variable in .env")

const sql = postgres(databaseUrl)

export default sql