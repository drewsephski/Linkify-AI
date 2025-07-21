import { LINKIFY_BRAND } from "./brand";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || LINKIFY_BRAND.name;

export const APP_DOMAIN = LINKIFY_BRAND.url;

export const APP_HOSTNAMES = new Set([
	process.env.NEXT_PUBLIC_APP_DOMAIN || LINKIFY_BRAND.domain,
	`www.${process.env.NEXT_PUBLIC_APP_DOMAIN || LINKIFY_BRAND.domain}`,
]);

// Re-export brand configuration for easy access
export { LINKIFY_BRAND } from "./brand";
