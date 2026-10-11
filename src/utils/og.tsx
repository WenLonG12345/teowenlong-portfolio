/* Hallmark · component: social-card · genre: modern-minimal · theme: custom amber (site dark tokens)
 * concept: the card is a miniature of the home page — identity tile, avatar tile, amber status tile
 * type: Bricolage Grotesque 700 (display) + Manrope (body), same pairing as the site
 * contrast: ink on card 15.6 · muted on card 6.7 · amber-ink on amber 7.4 — all pass at size
 * pre-emit critique: P5 H5 E4 S5 R5 V4
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { METADATA } from "@/constants";

export const OG_SIZE = { width: 1200, height: 630 };

// Locked tokens: the site's dark theme (globals.css .dark) as hex — satori is stricter than browsers.
const c = {
	paper: "#100f0e",
	card: "#1c1a17",
	rule: "#322e2a",
	ink: "#f3efe7",
	muted: "#a59d97",
	amber: "#df873a",
	amberStrong: "#eea463",
	amberInk: "#211408",
	disc: "#f3efe7",
};

// Static per-weight TTFs: satori renders a variable font at one weight only.
const face = (file: string, name: string, weight: 400 | 600 | 700) => ({
	name,
	data: readFileSync(join(process.cwd(), `src/assets/fonts/${file}.ttf`)),
	weight,
	style: "normal" as const,
});
export const OG_FONTS = [
	face("Bricolage-600", "Display", 600),
	face("Bricolage-700", "Display", 700),
	face("Manrope-400", "Body", 400),
	face("Manrope-600", "Body", 600),
];

// ponytail: pre-resized to 440px/23KB so the route stays under ImageResponse's 500KB cap.
// Re-run sips on profile_picture.png if the photo changes.
const avatar = readFileSync(join(process.cwd(), "src/assets/og-avatar.jpg"));
const AVATAR_SRC = `data:image/jpeg;base64,${avatar.toString("base64")}`;

const tileStyle = {
	display: "flex",
	background: c.card,
	border: `2px solid ${c.rule}`,
	borderRadius: 32,
} as const;

/** Bento frame shared by every OG image: `main` fills the big tile, `amber` the status tile. */
export const OgCard = ({
	main,
	amber,
}: {
	main: ReactNode;
	amber: ReactNode;
}) => (
	<div
		style={{
			width: "100%",
			height: "100%",
			display: "flex",
			gap: 18,
			padding: 40,
			background: c.paper,
			fontFamily: "Body",
			color: c.ink,
		}}
	>
		<div
			style={{
				...tileStyle,
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "52px 56px",
			}}
		>
			{main}
		</div>

		<div
			style={{ display: "flex", flexDirection: "column", gap: 18, width: 330 }}
		>
			<div
				style={{
					...tileStyle,
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						width: 216,
						height: 216,
						borderRadius: 216,
						background: c.disc,
						border: `6px solid ${c.amber}`,
					}}
				>
					{/* biome-ignore lint/performance/noImgElement: satori renders plain <img>; next/image can't run here */}
					<img
						src={AVATAR_SRC}
						width={204}
						height={204}
						style={{ borderRadius: 204, objectFit: "cover" }}
						alt=""
					/>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					height: 200,
					padding: "30px 32px",
					borderRadius: 32,
					background: c.amber,
					color: c.amberInk,
				}}
			>
				{amber}
			</div>
		</div>
	</div>
);

export const og = c;

// satori lays a React fragment out as a row; slot contents go in this column instead
export const OG_SLOT = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	flex: 1,
} as const;

/** Name + domain line that closes every main tile. */
export const OgByline = ({ right }: { right: string }) => (
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			paddingTop: 24,
			borderTop: `2px solid ${c.rule}`,
			fontSize: 22,
			fontWeight: 600,
			color: c.muted,
		}}
	>
		<div style={{ display: "flex" }}>{new URL(METADATA.url).host}</div>
		<div style={{ display: "flex" }}>{right}</div>
	</div>
);
