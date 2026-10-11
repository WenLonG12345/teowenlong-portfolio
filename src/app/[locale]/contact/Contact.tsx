"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuCopy } from "react-icons/lu";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { arrowOut, tile, tileLabel, tileLift } from "@/components/ui/tile";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

const SUBJECTS = ["subject_job", "subject_project", "subject_hello"] as const;
const PROFILES = SITE_CONFIG.footer.accounts.filter((a) =>
	a.url.startsWith("https://"),
);

const formSchema = z.object({
	firstName: z.string().min(2).max(255),
	lastName: z.string().min(2).max(255),
	email: z.email(),
	subject: z.string().min(2).max(255),
	message: z.string(),
});

const ContactClient = () => {
	const t = useTranslations();
	const [isSent, setIsSent] = useState(false);
	const [copied, setCopied] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			subject: t("contact.subject_job"),
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { firstName, lastName, email, subject, message } = values;
		const body = `Hello, I am ${firstName} ${lastName} (${email}).\n\n${message}`;
		window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		setIsSent(true);
		form.reset();
	}

	// silent success: the icon flips to a check for 2s, no toast
	async function copyEmail() {
		await navigator.clipboard.writeText(SITE_CONFIG.contact.email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="flex flex-col gap-10">
			<header className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight font-display md:text-5xl">
					{t("contact.title")}
				</h1>
				<p className="max-w-[56ch] text-muted-foreground">
					{t("contact.lede")}
				</p>
			</header>

			<Cascade className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
				<CascadeItem
					className={cn(
						"flex flex-col justify-between gap-6 p-6 rounded-2xl bg-primary text-primary-foreground md:col-span-2",
					)}
				>
					<span className={cn(tileLabel, "text-primary-foreground/70")}>
						{t("contact.email_label")}
					</span>
					<div className="flex flex-wrap items-center justify-between gap-4">
						<a
							href={`mailto:${SITE_CONFIG.contact.email}`}
							className="text-2xl font-bold wrap-anywhere font-display hover:underline underline-offset-4"
						>
							{SITE_CONFIG.contact.email}
						</a>
						<button
							type="button"
							onClick={copyEmail}
							className="inline-flex items-center gap-2 px-4 text-sm font-semibold transition-colors border rounded-xl min-h-11 border-primary-foreground/30 hover:bg-primary-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
						>
							{copied ? (
								<LuCheck aria-hidden="true" />
							) : (
								<LuCopy aria-hidden="true" />
							)}
							<span aria-live="polite">
								{copied ? t("contact.copied") : t("contact.copy")}
							</span>
						</button>
					</div>
				</CascadeItem>

				<CascadeItem>
					<a
						href={SITE_CONFIG.resume.url}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							tile,
							tileLift,
							"group flex flex-col justify-between h-full gap-6 p-6",
						)}
					>
						<span className={tileLabel}>{t("contact.resume_title")}</span>
						<span>
							<span className="block text-2xl font-bold font-display">
								{t("rail.resume")}
								<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
							</span>
							<span className="text-sm text-muted-foreground">
								{t("contact.resume_body")}
							</span>
						</span>
					</a>
				</CascadeItem>

				<CascadeItem className={cn(tile, "flex flex-col gap-4 p-6")}>
					<span className={tileLabel}>{t("contact.elsewhere")}</span>
					<ul className="flex flex-col gap-1 list-none">
						{PROFILES.map((p) => (
							<li key={p.url}>
								<a
									href={p.url}
									target="_blank"
									rel="me noopener noreferrer"
									className="flex items-center justify-between py-2 font-medium border-b group border-border hover:text-primary-strong"
								>
									{p.name}
									<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
								</a>
							</li>
						))}
					</ul>
				</CascadeItem>

				<CascadeItem className={cn(tile, "p-6 md:col-span-2")}>
					<AnimatePresence mode="wait" initial={false}>
						{isSent ? (
							<motion.div
								key="sent"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								className="flex flex-col items-start gap-3 py-8"
							>
								<span className="inline-flex items-center justify-center rounded-full size-10 bg-primary/15 text-primary-strong">
									<LuCheck size={20} aria-hidden="true" />
								</span>
								<p className="text-xl font-bold font-display">
									{t("contact.sent_success_title")}
								</p>
								<p className="text-sm text-muted-foreground">
									{t("contact.sent_success_desc")}
								</p>
								<Button
									variant="outline"
									onClick={() => setIsSent(false)}
									className="mt-2 rounded-xl"
								>
									{t("contact.send_another")}
								</Button>
							</motion.div>
						) : (
							<motion.div key="form" exit={{ opacity: 0 }}>
								<p className={cn(tileLabel, "mb-5")}>
									{t("contact.form_title")}
								</p>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="grid gap-4"
									>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("contact.first_name")}</FormLabel>
														<FormControl>
															<Input autoComplete="given-name" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("contact.last_name")}</FormLabel>
														<FormControl>
															<Input autoComplete="family-name" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("contact.email")}</FormLabel>
														<FormControl>
															<Input
																type="email"
																autoComplete="email"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="subject"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("contact.subject")}</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger className="w-full">
																	<SelectValue />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{SUBJECTS.map((key) => (
																	<SelectItem
																		key={key}
																		value={t(`contact.${key}`)}
																	>
																		{t(`contact.${key}`)}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<FormField
											control={form.control}
											name="message"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("contact.message")}</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder={t("contact.message_placeholder")}
															className="resize-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button className="justify-self-start rounded-xl min-h-11">
											{t("contact.send_message")}
										</Button>
									</form>
								</Form>
							</motion.div>
						)}
					</AnimatePresence>
				</CascadeItem>
			</Cascade>
		</div>
	);
};

export default ContactClient;
