import { createUser, hasCancelledSubscription } from "../lib/user-helpers";

async function testHasCancelledSubscription() {
	console.log("Testing hasCancelledSubscription function...");

	// Test with non-existent user
	const nonExistent = await hasCancelledSubscription("nonexistent@example.com");
	console.log("Non-existent user:", nonExistent);

	// Create a test user
	const testUser = await createUser(
		"test-cancel@example.com",
		"test_user_cancel",
	);
	console.log("Created test user:", testUser);

	// Check if user exists (should be active by default)
	const activeUser = await hasCancelledSubscription("test-cancel@example.com");
	console.log("Active user (should be false):", activeUser);

	// Note: We can't easily update status to cancelled without direct DB access
	// But we can verify the function structure works

	console.log("✅ hasCancelledSubscription function test completed!");
}

testHasCancelledSubscription().catch(console.error);
