export interface MetadataProps {
	params: Promise<{ locale: string }>;
}

export interface NavItemProps {
	href: string;
	label: string;
}

export interface TeamProps {
	imageUrl: string;
	firstName: string;
	lastName: string;
	positions: string[];
	socialNetworks: SocialNetworkProps[];
}

export interface SocialNetworkProps {
	name: string;
	url: string;
}

export interface ServiceProps {
	icon: string;
	title: string;
	description: string;
}

export interface FAQProps {
	question: string;
	answer: string;
	value: string;
}

export interface ProjectProps {
	image: string;
	name: string;
	description: string;
	url: string;
	techStack?: string[];
}

export type IMediumArticle = {
	title: string;
	url: string;
	thumbnail: string;
	description: string;
	date: string;
	categories: string[];
	guid: string;
	pubDate: string;
};

export type IMediumArticleRes = {
	status: string;
	feed: {
		url: string;
		title: string;
		link: string;
		author: string;
		description: string;
		image: string;
	};
	items: IMediumArticle[];
};

export type BlogPostMeta = {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	coverImage: string;
};

export type BlogPost = BlogPostMeta & {
	content: string;
};
