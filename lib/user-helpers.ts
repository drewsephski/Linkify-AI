import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function hasCancelledSubscription(email: string) {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	return user.length > 0 && user[0].status === "cancelled";
}

export async function doesUserExist(email: string) {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	return user.length > 0 ? user[0] : null;
}

export async function updateUser(userId: string, email: string) {
	const result = await db
		.update(users)
		.set({ userId })
		.where(eq(users.email, email))
		.returning();

	return result[0] || null;
}

export async function createUser(email: string, userId?: string) {
	const result = await db
		.insert(users)
		.values({
			email,
			userId,
		})
		.returning();

	return result[0];
}

export async function getUserByEmail(email: string) {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	return user[0] || null;
}

export async function getUserById(id: string) {
	const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

	return user[0] || null;
}

export function getPlanType(priceId: string | null) {
	if (priceId === null) return { id: "starter", name: "Starter" };

	// Simple plan mapping without importing the full PLANS array
	const planMap: Record<string, { id: string; name: string }> = {
		[process.env.STRIPE_PRICE_ID_BASIC_PLAN || ""]: {
			id: "basic",
			name: "Basic",
		},
		[process.env.STRIPE_PRICE_ID_PRO_PLAN || ""]: { id: "pro", name: "Pro" },
	};

	return planMap[priceId] || { id: "default", name: "Default" };
}
