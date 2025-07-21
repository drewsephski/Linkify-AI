import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	userId: text("user_id"),
	fullName: text("full_name"),
	customerId: text("customer_id"),
	priceId: text("price_id"),
	status: varchar("status", { length: 50 }).notNull().default("active"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const payments = pgTable("payments", {
	id: uuid("id").primaryKey().defaultRandom(),
	amount: integer("amount"),
	status: varchar("status", { length: 50 }),
	stripePaymentId: text("stripe_payment_id"),
	priceId: text("price_id"),
	userEmail: varchar("user_email", { length: 255 }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export const posts = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	title: text("title").notNull(),
	content: text("content"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
