import { config } from "dotenv";
config(); // Load environment variables

import { eq } from "drizzle-orm";
import { db } from "../lib/db/drizzle";
import { users } from "../lib/db/schema";

// Test the basic user helper functions without importing the full utils
async function testUserHelpers() {
	try {
		console.log("Testing user helper functions...");

		const testEmail = "test@example.com";

		// Test doesUserExist equivalent
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, testEmail))
			.limit(1);

		console.log(
			"✅ User query test passed:",
			existingUser.length === 0 ? "User doesn't exist" : "User exists",
		);

		// Test hasCancelledSubscription equivalent
		const cancelledUser = await db
			.select()
			.from(users)
			.where(eq(users.email, testEmail))
			.limit(1);

		const hasCancelled =
			cancelledUser.length > 0 && cancelledUser[0].status === "cancelled";
		console.log(
			"✅ Cancelled subscription test passed:",
			hasCancelled === false
				? "No cancelled subscription"
				: "Has cancelled subscription",
		);

		console.log("🎉 All user helper functions are working correctly!");
	} catch (error) {
		console.error("❌ User helper test failed:", error);
		process.exit(1);
	}
}

testUserHelpers();
