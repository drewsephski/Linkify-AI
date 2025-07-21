import { config } from "dotenv";
config(); // Load environment variables

import { db } from "../lib/db/drizzle";
import { users } from "../lib/db/schema";

async function testDrizzleConnection() {
	try {
		console.log("Testing Drizzle connection...");

		// Test basic connection
		const result = await db.execute("SELECT 1 as test");
		console.log("✅ Database connection successful:", result);

		// Test schema query
		const userCount = await db.select().from(users).limit(1);
		console.log("✅ Schema query successful, user count:", userCount.length);

		console.log("🎉 Drizzle setup is working correctly!");
	} catch (error) {
		console.error("❌ Drizzle connection failed:", error);
		process.exit(1);
	}
}

testDrizzleConnection();
