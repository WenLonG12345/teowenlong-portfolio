import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import { pageMetadata } from "@/utils/seo";
import ContactClient from "./Contact";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return pageMetadata({
		locale,
		path: "/contact",
		title: t("contact.title"),
		description: t("contact.lede"),
	});
}

const ContactPage = () => {
	return <ContactClient />;
};

export default ContactPage;
