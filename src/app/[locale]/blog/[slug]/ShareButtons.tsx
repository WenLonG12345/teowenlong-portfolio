"use client";

import { CheckIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { METADATA } from "@/constants";

interface ShareButtonsProps {
	title: string;
	slug: string;
}

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
	const [copied, setCopied] = useState(false);

	const postUrl = `${METADATA.url}/blog/${slug}`;
	const encodedUrl = encodeURIComponent(postUrl);
	const encodedTitle = encodeURIComponent(title);

	const shareLinks = {
		x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
	};

	const handleCopyLink = async () => {
		await navigator.clipboard.writeText(postUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex items-center gap-2 flex-wrap">
			<span className="text-sm text-muted-foreground font-medium">Share:</span>

			<a href={shareLinks.x} target="_blank" rel="noopener noreferrer">
				<Button
					variant="outline"
					size="sm"
					className="gap-2"
					aria-label="Share on X (Twitter)"
				>
					<FaXTwitter className="w-3.5 h-3.5" />X
				</Button>
			</a>

			<a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
				<Button
					variant="outline"
					size="sm"
					className="gap-2 text-[#0077B5] border-[#0077B5]/30 hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
					aria-label="Share on LinkedIn"
				>
					<FaLinkedinIn className="w-3.5 h-3.5" />
					LinkedIn
				</Button>
			</a>

			<Button
				variant="outline"
				size="sm"
				className="gap-2"
				onClick={handleCopyLink}
				aria-label="Copy link"
			>
				{copied ? (
					<>
						<CheckIcon className="w-3.5 h-3.5 text-green-500" />
						<span className="text-green-500">Copied!</span>
					</>
				) : (
					<>
						<LinkIcon className="w-3.5 h-3.5" />
						Copy Link
					</>
				)}
			</Button>
		</div>
	);
};

export default ShareButtons;
