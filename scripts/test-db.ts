import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "../lib/db/schema";

dotenv.config();

async function testDatabase() {
	console.log("Testing database connection...");

	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not defined");
	}

	const sql = neon(process.env.DATABASE_URL);
	const db = drizzle(sql);

	try {
		// Test 1: Check if users table exists
		console.log("✅ Database connection successful");

		// Test 2: Insert a test user
		console.log("Inserting test user...");
		const testUser = await db
			.insert(users)
			.values({
				email: "test@example.com",
				userId: "test_user_123",
				status: "active",
			})
			.returning();

		console.log("✅ Test user inserted:", testUser[0]);

		// Test 3: Query the test user
		console.log("Querying test user...");
		const queriedUser = await db
			.select()
			.from(users)
			.where(eq(users.email, "test@example.com"));

		console.log("✅ Test user queried:", queriedUser[0]);

		// Test 4: Clean up test user
		console.log("Cleaning up test user...");
		await db.delete(users).where(eq(users.email, "test@example.com"));

		console.log("✅ All database tests passed!");
	} catch (error) {
		console.error("❌ Database test failed:", error);
		process.exit(1);
	}
}

testDatabase();
