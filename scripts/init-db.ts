import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

dotenv.config();

async function initDatabase() {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not defined");
	}

	console.log("Initializing database...");

	try {
		const sql = neon(process.env.DATABASE_URL);
		const db = drizzle(sql);

		console.log("Running migrations...");
		await migrate(db, { migrationsFolder: "./drizzle" });

		console.log("✅ Database initialized successfully!");
	} catch (error) {
		console.error("❌ Error initializing database:", error);
		process.exit(1);
	}
}

initDatabase();
