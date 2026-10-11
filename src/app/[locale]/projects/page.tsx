import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { MetadataProps } from "@/constants/types";
import ProjectsClient from "./Projects";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("project.title"),
		description: t("project.lede"),
		openGraph: {
			type: "website",
			title: t("project.title"),
			description: t("project.lede"),
			url: "/projects",
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("project.title"),
			description: t("project.lede"),
			images: ["/og_image.png"],
		},
	};
}

const ProjectsPage = () => <ProjectsClient />;

export default ProjectsPage;
