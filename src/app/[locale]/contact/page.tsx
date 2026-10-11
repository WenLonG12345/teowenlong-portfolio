import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import ContactClient from "./Contact";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("contact.title"),
		description: t("contact.lede"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
			type: "website",
			title: t("contact.title"),
			url: "/contact",
			description: t("contact.lede"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("contact.title"),
			site: "/contact",
			description: t("contact.lede"),
			images: ["/og_image.png"],
		},
	};
}

const ContactPage = () => {
	return <ContactClient />;
};

export default ContactPage;
