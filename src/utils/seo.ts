import type { Metadata } from "next";
import { CAREER_LIST, METADATA, SITE_CONFIG } from "@/constants";
import { routing } from "@/i18n/routing";

// next-intl `localePrefix: "as-needed"`: en lives at /path, zh at /zh/path
export const localePath = (locale: string, path: string) =>
	locale === routing.defaultLocale
		? path
		: `/${locale}${path === "/" ? "" : path}`;

/** Self-referencing canonical + hreflang for a page that exists in every locale. */
export const alternates = (
	locale: string,
	path: string,
): Metadata["alternates"] => ({
	canonical: localePath(locale, path),
	languages: {
		...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)])),
		"x-default": localePath(routing.defaultLocale, path),
	},
});

export const OG_IMAGE = {
	url: "/api/og",
	width: 1200,
	height: 630,
	alt: "Teo Wen Long, Software Engineer helping businesses through digital transformation",
};

/** Shared shape for the static pages. */
export const pageMetadata = ({
	locale,
	path,
	title,
	description,
}: {
	locale: string;
	path: string;
	title?: string;
	description: string;
}): Metadata => ({
	// spread, not `title: undefined`: an explicit undefined wipes the layout's default title
	...(title && { title }),
	description,
	alternates: alternates(locale, path),
	openGraph: {
		type: "website",
		siteName: METADATA.name,
		locale: locale === "zh" ? "zh_CN" : "en_US",
		url: localePath(locale, path),
		title: title ?? METADATA.title,
		description,
		images: [OG_IMAGE],
	},
	twitter: {
		card: "summary_large_image",
		title: title ?? METADATA.title,
		description,
		images: [OG_IMAGE.url],
	},
});

const [NOW] = CAREER_LIST;

export const PERSON = {
	"@type": "Person",
	"@id": `${METADATA.url}/#person`,
	name: METADATA.name,
	url: METADATA.url,
	image: `${METADATA.url}/images/profile_picture.png`,
	jobTitle: "Software Engineer",
	worksFor: { "@type": "Organization", name: NOW.title, url: NOW.url },
	address: { "@type": "PostalAddress", addressCountry: "MY" },
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"Go",
		"AWS",
		"AI products",
		"Digital transformation",
	],
	sameAs: SITE_CONFIG.footer.accounts
		.map((a) => a.url)
		.filter((url) => url.startsWith("https://")),
};

/** JSON-LD for a <script type="application/ld+json">; `<` escaped so content can't close the tag. */
export const jsonLd = (data: Record<string, unknown>) => ({
	__html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(
		/</g,
		"\\u003c",
	),
});
