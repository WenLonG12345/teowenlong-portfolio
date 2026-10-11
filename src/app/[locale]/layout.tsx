import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import ReactQueryProvider from "@/components/layout/react-query-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { METADATA } from "@/constants";
import { routing } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { MotionProvider } from "@/utils/motion-div";
import { OG_IMAGE } from "@/utils/seo";

import "./globals.css";

// const ClickSpark = dynamic(() => import("@/components/click-spark"), {
//   ssr: false,
// });

const display = Bricolage_Grotesque({
	subsets: ["latin"],
	variable: "--font-bricolage",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
});

// Site-wide defaults only. Canonical + hreflang are per page (utils/seo.ts): a canonical set
// here would be inherited by every route and point them all at the home page.
export const metadata: Metadata = {
	metadataBase: new URL(METADATA.url),
	title: {
		default: METADATA.title,
		template: METADATA.titleTemplate,
	},
	description: METADATA.description,
	applicationName: METADATA.name,
	authors: [{ name: METADATA.name, url: METADATA.url }],
	creator: METADATA.name,
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{
				url: "/images/android/android-192-192.png",
				type: "image/png",
				sizes: "192x192",
			},
		],
		apple: "/images/android/android-192-192.png",
	},
	manifest: "/manifest.json",
	openGraph: {
		type: "website",
		siteName: METADATA.name,
		title: METADATA.title,
		description: METADATA.description,
		images: [OG_IMAGE],
	},
	twitter: {
		card: "summary_large_image",
		title: METADATA.title,
		description: METADATA.description,
		images: [OG_IMAGE.url],
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as "en" | "zh")) {
		notFound();
	}

	setRequestLocale(locale);

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans text-foreground antialiased",
					display.variable,
					body.variable,
					mono.variable,
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<ReactQueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<MotionProvider>
								{/* Feature Stack shell: pinned rail left, bento content right */}
								<div className="flex flex-col max-w-6xl px-5 mx-auto sm:px-8 lg:flex-row lg:gap-16 lg:px-10">
									<Navbar />
									<main className="flex-1 min-w-0 max-lg:pb-20 lg:py-20">
										{children}
										<Footer />
									</main>
								</div>
							</MotionProvider>
						</ThemeProvider>
						<Analytics />
						<SpeedInsights />
					</ReactQueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
