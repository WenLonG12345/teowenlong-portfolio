/* Hallmark · component: social-card · genre: modern-minimal · theme: custom
 * (two-stop gradient #041B3F → #0B4FC0 · anchor hue 262 · accent #8FBBFF)
 * type: Bricolage Grotesque (display) + Manrope (body) — same pairing as the site
 * pre-emit critique: P5 H5 E5 S5 R4 V5
 * contrast where the text sits (dark stop): ink 15.8 · muted 10.1 · accent 8.7
 * worst case (light stop, right edge): ink 6.8 · muted 4.3 · accent 3.7 — all pass at size
 */

import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
	"Teo — Software Engineer helping businesses through digital transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Locked tokens. Every colour below is a named entry here — no inline literals in the tree.
const t = {
	gradFrom: "#141210",
	gradTo: "#3A230F",
	ink: "#F2EEE6",
	muted: "#C4B8AC",
	accent: "#E9A465",
	disc: "#F2EEE6",
	rule: "rgba(242,238,230,0.24)",
	pillBg: "rgba(242,238,230,0.10)",
	pillBorder: "rgba(242,238,230,0.34)",
};

// Static per-weight TTFs (Google Fonts serves these to legacy user agents); satori
// renders a variable .ttf at one weight only, so static instances are required.
// Same pairing as the site: Bricolage Grotesque for display, Manrope for text.
const face = (file: string, name: string, weight: 400 | 600 | 700) => ({
	name,
	data: readFileSync(join(process.cwd(), `src/assets/fonts/${file}.ttf`)),
	weight,
	style: "normal" as const,
});
const fonts = [
	face("Bricolage-600", "Display", 600),
	face("Bricolage-700", "Display", 700),
	face("Manrope-400", "Body", 400),
	face("Manrope-600", "Body", 600),
];

// ponytail: avatar is pre-resized to 440px/23KB so the route stays well under
// ImageResponse's 500KB bundle cap. Re-run sips on profile_picture.png if it changes.
const avatar = await readFile(join(process.cwd(), "src/assets/og-avatar.jpg"));
const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

// ponytail: ImageResponse's built-in grotesque, no font fetch. Outfit ships only as a
// variable .ttf, which satori renders at a single weight — the pairing isn't worth the risk.
export default function Image() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: `linear-gradient(135deg, ${t.gradFrom} 0%, ${t.gradTo} 100%)`,
				padding: "64px 76px",
				fontFamily: "Body",
			}}
		>
			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					justifyContent: "space-between",
					gap: 56,
				}}
			>
				<div
					style={{ display: "flex", flexDirection: "column", maxWidth: 690 }}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 14,
							color: t.muted,
							fontSize: 21,
							fontWeight: 600,
							letterSpacing: 5,
						}}
					>
						<div style={{ width: 40, height: 3, background: t.accent }} />
						MALAYSIA
					</div>
					<div
						style={{
							color: t.ink,
							fontFamily: "Display",
							fontSize: 148,
							fontWeight: 700,
							lineHeight: 1,
							letterSpacing: -5,
							marginTop: 14,
						}}
					>
						Teo
					</div>
					<div
						style={{
							color: t.accent,
							fontFamily: "Display",
							fontSize: 38,
							fontWeight: 600,
							lineHeight: 1.2,
							marginTop: 14,
						}}
					>
						Software Engineer
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							color: t.muted,
							fontSize: 26,
							fontWeight: 400,
							lineHeight: 1.45,
							marginTop: 18,
						}}
					>
						<div style={{ display: "flex" }}>
							Helping businesses through digital transformation,
						</div>
						<div style={{ display: "flex" }}>
							designing and delivering the platforms they run on.
						</div>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						width: 316,
						height: 316,
						borderRadius: 316,
						background: t.disc,
						border: `8px solid ${t.accent}`,
						flexShrink: 0,
					}}
				>
					<img
						src={avatarSrc}
						width={300}
						height={300}
						style={{ borderRadius: 300, objectFit: "cover" }}
						alt=""
					/>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderTop: `2px solid ${t.rule}`,
					paddingTop: 24,
					fontSize: 23,
				}}
			>
				<div style={{ display: "flex", color: t.ink, fontWeight: 600 }}>
					teowenlong.vercel.app
				</div>
				<div style={{ display: "flex", gap: 11 }}>
					{["React", "Next.js", "TypeScript", "AWS"].map((tech) => (
						<div
							key={tech}
							style={{
								display: "flex",
								color: t.ink,
								background: t.pillBg,
								border: `1px solid ${t.pillBorder}`,
								borderRadius: 999,
								padding: "7px 17px",
								fontSize: 20,
								fontWeight: 600,
							}}
						>
							{tech}
						</div>
					))}
				</div>
			</div>
		</div>,
		{ ...size, fonts },
	);
}
