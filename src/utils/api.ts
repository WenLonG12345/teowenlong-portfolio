import dayjs from "dayjs";
import type { IMediumArticleRes } from "@/constants/types";
import { shortenDescription } from "./shortenDescription";

export const getMediumArticles = async (username: string) => {
	try {
		const fetchRes = await fetch(
			`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
		);

		const res = (await fetchRes.json()) as IMediumArticleRes;

		const { items } = res || {};

		const article = items?.map(
			({ title, guid, pubDate, description, categories }) => {
				return {
					title: title,
					thumbnail: description
						?.toString()
						.match(/<img[^>]+src="([^">]+)"/)?.[1],
					url: guid,
					date: dayjs(pubDate).format("MMM D, YYYY"),
					description: shortenDescription(description),
					categories: categories,
				};
			},
		);

		return article;
	} catch (err) {
		console.error(err);
		return [];
	}
};
