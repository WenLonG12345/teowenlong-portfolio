import dayjs from "dayjs";
import { ImageResponse } from "next/og";
import { getAllPosts } from "@/utils/blog";
import { OG_FONTS, OG_SIZE, OG_SLOT, OgByline, OgCard, og } from "@/utils/og";

export const dynamicParams = false;
export const generateStaticParams = () =>
	getAllPosts().map((post) => ({ slug: post.slug }));

// One card per post, so a shared article previews its own title instead of the site card.
export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const post = getAllPosts().find((p) => p.slug === slug);
	const title = post?.title ?? "Writing";
	// three lines at most inside the tile: step down for long titles
	const titleSize = title.length > 70 ? 50 : title.length > 45 ? 58 : 68;

	return new ImageResponse(
		<OgCard
			main={
				<div style={OG_SLOT}>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontWeight: 600,
								color: og.amberStrong,
							}}
						>
							Writing
							{post ? ` · ${dayjs(post.date).format("MMM D, YYYY")}` : ""}
						</div>
						<div
							style={{
								display: "flex",
								marginTop: 22,
								fontFamily: "Display",
								fontSize: titleSize,
								fontWeight: 700,
								lineHeight: 1.08,
								letterSpacing: -1.5,
							}}
						>
							{title}
						</div>
					</div>
					<OgByline right="Teo Wen Long" />
				</div>
			}
			amber={
				<div style={OG_SLOT}>
					<div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>
						Read on the blog
					</div>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 8,
							fontSize: 19,
							fontWeight: 600,
						}}
					>
						{(post?.tags ?? []).slice(0, 3).map((tag) => (
							<div
								key={tag}
								style={{
									display: "flex",
									padding: "5px 13px",
									borderRadius: 999,
									border: `2px solid ${og.amberInk}`,
								}}
							>
								{tag}
							</div>
						))}
					</div>
				</div>
			}
		/>,
		{ ...OG_SIZE, fonts: OG_FONTS },
	);
}
