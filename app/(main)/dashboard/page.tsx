import { BlogGeneratorForm } from "@/components/blog/blog-generator-form";
import { ErrorBoundary } from "@/components/dashboard/error-boundary";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { UsageStats } from "@/components/dashboard/usage-stats";
import { MaxWidthWrapper } from "@/components/global";
import AnimationWrapper from "@/components/global/animation-wrapper";
import MagicBadge from "@/components/ui/magic-badge";
import { Separator } from "@/components/ui/separator";
import UpgradeYourPlan from "@/components/upload/upgrade-your-plan";
import UploadForm from "@/components/upload/upload-form";
import getDbConnection from "@/lib/db";
import { doesUserExist, getPlanType, updateUser } from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const clerkUser = await currentUser();

	if (!clerkUser) {
		return redirect("/sign-in");
	}

	const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

	const sql = await getDbConnection();

	//updatethe user id
	let userId = null;
	let priceId = null;

	const user = await doesUserExist(email);

	if (user) {
		//update the user_id in users table
		userId = clerkUser?.id;
		if (userId) {
			await updateUser(userId, email);
		}

		priceId = user.priceId;
	}

	const { id: planTypeId = "starter", name: planTypeName } =
		getPlanType(priceId);

	const isBasicPlan = planTypeId === "basic";
	const isProPlan = planTypeId === "pro";

	// check number of posts per plan
	const postsData =
		await sql`SELECT id, title, created_at FROM posts WHERE user_id = ${userId} ORDER BY created_at DESC`;

	// Transform posts data to match the expected format
	const posts = postsData.map((post: any) => ({
		id: post.id.toString(),
		title: post.title || "Untitled Post",
		createdAt: new Date(post.created_at),
		status: post.status || "draft",
	}));

	const isValidBasicPlan = isBasicPlan && posts.length < 3;

	// Get plan limits
	const getMaxPosts = (planId: string) => {
		switch (planId) {
			case "basic":
				return 3;
			case "pro":
				return 50;
			default:
				return 0;
		}
	};

	const maxPosts = getMaxPosts(planTypeId);

	return (
		<MaxWidthWrapper className="mb-40">
			<div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
				<AnimationWrapper>
					<MagicBadge title="AI Blog Post Generator" />
				</AnimationWrapper>
				<AnimationWrapper>
					<h1 className="mt-4 font-bold text-5xl">Create Your Blog</h1>
				</AnimationWrapper>
				<AnimationWrapper>
					<p className="mt-4 text-center text-lg text-muted-foreground">
						Generate high-quality blog posts in seconds with the power of AI.
					</p>
				</AnimationWrapper>
			</div>

			{/* Usage Statistics */}
			{(isBasicPlan || isProPlan) && (
				<AnimationWrapper className="mx-auto mb-8 max-w-4xl">
					<ErrorBoundary>
						<UsageStats
							planType={planTypeId}
							postsUsed={posts.length}
							postsLimit={maxPosts}
						/>
					</ErrorBoundary>
				</AnimationWrapper>
			)}

			{/* Blog Generator Form */}
			<AnimationWrapper className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-8">
				<ErrorBoundary>
					<BlogGeneratorForm />
				</ErrorBoundary>
			</AnimationWrapper>

			{/* Recent Posts Section */}
			{posts.length > 0 && (
				<>
					<Separator className="my-12" />
					<AnimationWrapper className="mx-auto max-w-4xl">
						<ErrorBoundary>
							<RecentPosts posts={posts} />
						</ErrorBoundary>
					</AnimationWrapper>
				</>
			)}

			<Separator className="my-12" />

			{/* Upload Section */}
			<AnimationWrapper className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
				{isValidBasicPlan || isProPlan ? (
					<UploadForm planTypeName={planTypeName} />
				) : (
					<UpgradeYourPlan />
				)}
			</AnimationWrapper>
		</MaxWidthWrapper>
	);
}
