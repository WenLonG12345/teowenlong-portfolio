// Bento tile vocabulary shared by every page (see design.md › Tiles).
export const tile = "rounded-2xl border border-border bg-card";

// hover/focus lift for tiles that are links; transform + border + shadow only
export const tileLift =
	"transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_16px_32px_-20px_hsl(var(--primary)/0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export const tileLabel =
	"font-mono text-[11px] tracking-wider uppercase text-muted-foreground";

// lucide arrows beside link text: sized to the text, nudged toward their direction on .group hover
const arrow =
	"inline-block size-[1em] ml-[0.2em] shrink-0 align-[-0.125em] transition-transform duration-200 ease-out motion-reduce:transition-none";
/** leaves the site (ArrowUpRightIcon) */
export const arrowOut = `${arrow} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`;
/** goes deeper into the site (ArrowRightIcon) */
export const arrowNext = `${arrow} group-hover:translate-x-1`;
