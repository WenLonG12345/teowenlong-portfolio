import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ExperienceSection from "@/components/layout/sections/experience";
import HeroSection from "@/components/layout/sections/hero";
import ProjectSection from "@/components/layout/sections/project";
import WritingSection from "@/components/layout/sections/writing";
import { METADATA } from "@/constants";
import type { MetadataProps } from "@/constants/types";
import { getAllPosts } from "@/utils/blog";
import { jsonLd, PERSON, pageMetadata } from "@/utils/seo";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	// no title: the layout default (full name + role) is the home title
	return pageMetadata({ locale, path: "/", description: t("rail.tagline") });
}

export default function Home() {
	const [latest] = getAllPosts();

	return (
		<div className="flex flex-col gap-14">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from constants, `<` escaped in jsonLd()
				dangerouslySetInnerHTML={jsonLd({
					"@graph": [
						PERSON,
						{
							"@type": "WebSite",
							"@id": `${METADATA.url}/#website`,
							url: METADATA.url,
							name: METADATA.name,
							inLanguage: ["en", "zh"],
							publisher: { "@id": PERSON["@id"] },
						},
					],
				})}
			/>
			<HeroSection />
			<ExperienceSection />
			<ProjectSection />
			<WritingSection post={latest} />
		</div>
	);
}
