import { config } from "dotenv";
config(); // Load environment variables

console.log("Testing db import...");

try {
	const dbModule = require("../lib/db");
	console.log("db module keys:", Object.keys(dbModule));
	console.log("db module:", dbModule);

	const { db } = dbModule;
	console.log("db instance:", db);
	console.log("db type:", typeof db);

	if (db && typeof db.select === "function") {
		console.log("✅ db.select is available");
	} else {
		console.log("❌ db.select is not available");
	}
} catch (error) {
	console.error("❌ Import failed:", error);
}
