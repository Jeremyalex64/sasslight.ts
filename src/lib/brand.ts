/**
 * SASSLIGHT brand design tokens — use these everywhere for consistent styling.
 * Colors: gold on black. Never use emerald/green accents on this project.
 */

export const brand = {
	colors: {
		gold: "text-amber-400",
		goldHover: "hover:text-amber-400",
		goldMuted: "text-amber-600",
		goldButton: "bg-amber-600 hover:bg-amber-500 text-black",
		goldButtonOutline: "border-amber-600 text-amber-600",
		body: "text-zinc-600 dark:text-zinc-400",
		heading: "text-zinc-900 dark:text-zinc-100",
		navLink: "text-zinc-300 transition-colors hover:text-amber-400",
	},

	surfaces: {
		header: "sticky top-0 z-50 border-b border-zinc-800/50 bg-black backdrop-blur-md",
		footer: "border-t border-zinc-800 bg-black",
		hero: "border-b border-zinc-800 bg-black",
		card: "rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
		cardHighlight:
			"rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
	},

	layout: {
		container: "mx-auto max-w-6xl px-4 sm:px-6",
		pageNarrow: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16",
	},

	nav: {
		barHeight: "h-28 md:h-[6.25rem]",
		logoSize: "nav" as const,
		link: "text-sm font-medium text-zinc-300 transition-colors hover:text-amber-400",
		gap: "gap-5 sm:gap-8",
	},

	logo: {
		src: "/sasslight-logo.png",
		alt: "SASSLIGHT",
		containers: {
			sm: "h-20 max-w-[min(calc(100vw-2rem),320px)] md:h-12 md:max-w-[192px]",
			md: "h-[5.5rem] max-w-[min(calc(100vw-2rem),350px)] md:h-14 md:max-w-[224px]",
			footer: "h-24 max-w-[min(calc(100vw-2rem),380px)] md:h-16 md:max-w-[260px]",
			nav: "h-24 max-w-[min(calc(100vw-5rem),440px)] md:h-[5.5rem] md:max-w-[352px]",
			lg: "h-32 max-w-[min(calc(100vw-2rem),440px)] md:h-20 md:max-w-[320px]",
		},
		imageClass: "object-contain brightness-[1.06] contrast-[1.05] drop-shadow-[0_0_14px_rgba(251,191,36,0.12)]",
	},

	button: {
		primary:
			"rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-500 disabled:opacity-50",
		secondary:
			"rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
	},

	input:
		"mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100",

	label: "block text-sm font-medium text-zinc-700 dark:text-zinc-300",
} as const;

export type LogoSize = keyof typeof brand.logo.containers;
