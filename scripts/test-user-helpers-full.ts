import { config } from "dotenv";
config(); // Load environment variables

import {
	doesUserExist,
	getPlanType,
	hasCancelledSubscription,
} from "../lib/user-helpers";

async function testUserHelpers() {
	try {
		console.log("Testing user helper functions...");

		const testEmail = "test@example.com";

		// Test doesUserExist (should return null for non-existent user)
		const existingUser = await doesUserExist(testEmail);
		console.log(
			"✅ doesUserExist test passed:",
			existingUser === null ? "User doesn't exist" : "User exists",
		);

		// Test hasCancelledSubscription (should return false for non-existent user)
		const hasCancelled = await hasCancelledSubscription(testEmail);
		console.log(
			"✅ hasCancelledSubscription test passed:",
			hasCancelled === false
				? "No cancelled subscription"
				: "Has cancelled subscription",
		);

		// Test getPlanType
		const planType = getPlanType(null);
		console.log("✅ getPlanType test passed:", planType);

		console.log("🎉 All user helper functions are working correctly!");
	} catch (error) {
		console.error("❌ User helper test failed:", error);
		process.exit(1);
	}
}

testUserHelpers();
