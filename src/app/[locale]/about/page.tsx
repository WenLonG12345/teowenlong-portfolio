import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { MetadataProps } from "@/constants/types";
import AboutClient from "./About";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("about.title"),
		description: t("about.lede"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("about.title"),
			description: t("about.lede"),
			url: "/about",
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("about.title"),
			description: t("about.lede"),
			site: "/about",
			images: ["/og_image.png"],
		},
	};
}

const AboutPage = () => {
	return <AboutClient />;
};

export default AboutPage;
