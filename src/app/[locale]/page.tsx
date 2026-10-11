import ExperienceSection from "@/components/layout/sections/experience";
import HeroSection from "@/components/layout/sections/hero";
import ProjectSection from "@/components/layout/sections/project";
import WritingSection from "@/components/layout/sections/writing";
import { getAllPosts } from "@/utils/blog";

export default function Home() {
	const [latest] = getAllPosts();

	return (
		<div className="flex flex-col gap-14">
			<HeroSection />
			<ExperienceSection />
			<ProjectSection />
			<WritingSection post={latest} />
		</div>
	);
}
