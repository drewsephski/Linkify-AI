import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle> | null = null;

const url = process.env.DATABASE_URL;
if (!url) {
	throw new Error(
		"DATABASE_URL is not defined. Make sure to set it in your .env file.",
	);
}

const sql = neon(url + "?sslmode=require");
_db = drizzle(sql, { schema });

export const db = _db as ReturnType<typeof drizzle>;
