import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { MetadataProps } from "@/constants/types";
import { pageMetadata } from "@/utils/seo";
import ProjectsClient from "./Projects";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return pageMetadata({
		locale,
		path: "/projects",
		title: t("project.title"),
		description: t("project.lede"),
	});
}

const ProjectsPage = () => <ProjectsClient />;

export default ProjectsPage;
