import { Metadata } from "next";
import { LINKIFY_BRAND } from "../constants/brand";

export const generateMetadata = ({
	title = `${LINKIFY_BRAND.name} - ${LINKIFY_BRAND.tagline}`,
	description = LINKIFY_BRAND.description,
	image = LINKIFY_BRAND.assets.images.og,
	icons = [
		{
			rel: "apple-touch-icon",
			sizes: "32x32",
			url: "/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/svg+xml",
			url: LINKIFY_BRAND.assets.logo.favicon,
		},
		{
			rel: "icon",
			sizes: "32x32",
			url: "/favicon-32x32.png",
		},
		{
			rel: "icon",
			sizes: "16x16",
			url: "/favicon-16x16.png",
		},
	],
	noIndex = false,
}: {
	title?: string;
	description?: string;
	image?: string | null;
	icons?: Metadata["icons"];
	noIndex?: boolean;
} = {}): Metadata => ({
	title,
	description,
	icons,
	openGraph: {
		title,
		description,
		siteName: LINKIFY_BRAND.name,
		locale: "en_US",
		type: "website",
		...(image && {
			images: [
				{
					url: image,
					width: 1260,
					height: 800,
					alt: `${LINKIFY_BRAND.name} - ${LINKIFY_BRAND.tagline}`,
				},
			],
		}),
	},
	twitter: {
		title,
		description,
		site: LINKIFY_BRAND.social.twitter,
		creator: LINKIFY_BRAND.social.twitter,
		...(image && { card: "summary_large_image", images: [image] }),
	},
	metadataBase: new URL(LINKIFY_BRAND.url),
	alternates: {
		canonical: LINKIFY_BRAND.url,
	},
	...(noIndex && { robots: { index: false, follow: false } }),
});
