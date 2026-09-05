import Image from "next/image";
import Link from "next/link";
import { brand, type LogoSize } from "@/lib/brand";

interface NavBrandProps {
	size?: LogoSize;
	priority?: boolean;
}

const dimensions: Record<LogoSize, { width: number; height: number }> = {
	sm: { width: 160, height: 40 },
	md: { width: 180, height: 45 },
	footer: { width: 260, height: 64 },
	nav: { width: 352, height: 88 },
	lg: { width: 320, height: 80 },
};

export default function NavBrand({ size = "md", priority = false }: NavBrandProps) {
	const { width, height } = dimensions[size];

	return (
		<Link
			href="/"
			className={`inline-flex min-w-0 shrink items-center ${brand.logo.containers[size]}`}
		>
			<Image
				src={brand.logo.src}
				alt={brand.logo.alt}
				width={width}
				height={height}
				className={`h-full w-auto max-w-full object-contain object-left ${brand.logo.imageClass}`}
				sizes={size === "nav" ? "(max-width: 768px) 440px, 352px" : "(max-width: 768px) 350px, 224px"}
				unoptimized
				priority={priority}
			/>
		</Link>
	);
}
