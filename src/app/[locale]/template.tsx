// Re-mounts on every navigation (the rail in layout.tsx does not), so page content
// gets a short CSS entrance while the rail stays put.
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className="animate-rise motion-reduce:animate-none">{children}</div>
	);
}
