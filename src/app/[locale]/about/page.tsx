import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { MetadataProps } from "@/constants/types";
import { pageMetadata } from "@/utils/seo";
import AboutClient from "./About";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return pageMetadata({
		locale,
		path: "/about",
		title: t("about.title"),
		description: t("about.lede"),
	});
}

const AboutPage = () => {
	return <AboutClient />;
};

export default AboutPage;
