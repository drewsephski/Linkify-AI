import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userPosts = await db
			.select()
			.from(posts)
			.where(eq(posts.userId, userId))
			.orderBy(posts.createdAt);

		return NextResponse.json({ posts: userPosts });
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, content } = await request.json();

		if (!title || !content) {
			return NextResponse.json(
				{ error: "Title and content are required" },
				{ status: 400 },
			);
		}

		const newPost = await db
			.insert(posts)
			.values({
				userId,
				title,
				content,
			})
			.returning();

		return NextResponse.json({ post: newPost[0] });
	} catch (error) {
		console.error("Error creating post:", error);
		return NextResponse.json(
			{ error: "Failed to create post" },
			{ status: 500 },
		);
	}
}
