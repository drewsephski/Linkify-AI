// Simple test for hasCancelledSubscription function
const { execSync } = require("child_process");
const path = require("path");

// Test the database connection and basic functionality
console.log("Testing hasCancelledSubscription function...");

// Create a simple test using the existing test-db script as a template
const testScript = `
import { hasCancelledSubscription, doesUserExist, createUser } from '@/lib/user-helpers';
import { db } from '@/lib/db';

async function testFunctions() {
    console.log('Testing hasCancelledSubscription...');
    
    // Test with non-existent email
    const result1 = await hasCancelledSubscription('nonexistent@example.com');
    console.log('Non-existent user result:', result1);
    
    // Test doesUserExist
    const result2 = await doesUserExist('nonexistent@example.com');
    console.log('doesUserExist result:', result2);
    
    console.log('✅ All function tests completed successfully!');
}

testFunctions().catch(console.error);
`;

// Write and execute the test
require("fs").writeFileSync("/tmp/test-functions.ts", testScript);
try {
	execSync("npx tsx /tmp/test-functions.ts", { stdio: "inherit" });
} catch (error) {
	console.error("Test failed:", error.message);
}
