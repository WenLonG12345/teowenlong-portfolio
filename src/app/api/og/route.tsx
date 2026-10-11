import { ImageResponse } from "next/og";
import { OG_FONTS, OG_SIZE, OG_SLOT, OgByline, OgCard, og } from "@/utils/og";

// Plain route (not the opengraph-image convention): next-intl's locale prefix made those
// URLs 307-redirect, and pages that set their own openGraph dropped the image. Referenced
// explicitly from utils/seo.ts. English on both locales: the fonts carry no CJK glyphs.
export function GET() {
	return new ImageResponse(
		<OgCard
			main={
				<div style={OG_SLOT}>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								display: "flex",
								fontFamily: "Display",
								fontSize: 92,
								fontWeight: 700,
								lineHeight: 1,
								letterSpacing: -3,
							}}
						>
							Teo Wen Long
						</div>
						<div
							style={{
								display: "flex",
								marginTop: 18,
								fontFamily: "Display",
								fontSize: 40,
								fontWeight: 600,
								color: og.amberStrong,
							}}
						>
							Software Engineer
						</div>
						<div
							style={{
								display: "flex",
								marginTop: 26,
								maxWidth: 600,
								fontSize: 28,
								lineHeight: 1.4,
								color: og.muted,
							}}
						>
							I help businesses through digital transformation, building the
							web, mobile and AI products they run on.
						</div>
					</div>
					<OgByline right="Malaysia" />
				</div>
			}
			amber={
				<div style={OG_SLOT}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 14,
							fontSize: 26,
							fontWeight: 600,
						}}
					>
						<div
							style={{
								width: 14,
								height: 14,
								borderRadius: 14,
								background: og.amberInk,
							}}
						/>
						Open to new roles
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 21,
							fontWeight: 600,
							lineHeight: 1.4,
						}}
					>
						React · Next.js · Go · AI
					</div>
				</div>
			}
		/>,
		{ ...OG_SIZE, fonts: OG_FONTS },
	);
}
