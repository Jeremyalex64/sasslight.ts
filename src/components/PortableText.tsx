import { PortableText as PortableTextComponent } from "@portabletext/react";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={value.asset}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg w-full"
        />
        {value.alt && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {value.alt}
          </p>
        )}
      </div>
    ),
    styledText: ({ value }: any) => {
      const style: React.CSSProperties = {};
      if (value.fontFamily) style.fontFamily = value.fontFamily;
      if (value.fontSize) style.fontSize = value.fontSize;
      if (value.fontWeight) style.fontWeight = value.fontWeight as any;
      if (value.color) style.color = value.color;

      return (
        <div className="my-4" style={style}>
          <PortableTextComponent
            value={value.content}
            components={components}
          />
        </div>
      );
    },
    videoEmbed: ({ value }: any) => {
      if (!value.url) return null;

      let embedUrl = value.url;
      if (value.platform === "youtube") {
        const videoId = value.url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
        )?.[1];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } else if (value.platform === "vimeo") {
        const videoId = value.url.match(/vimeo\.com\/(\d+)/)?.[1];
        if (videoId) {
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
        }
      }

      return (
        <div className="my-8">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    adsense: ({ value }: any) => {
      if (!value.adSlot || !value.adClient) return null;

      return (
        <div className="my-8 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{
              display: "inline-block",
              width: `${value.width}px`,
              height: `${value.height}px`,
            }}
            data-ad-client={value.adClient}
            data-ad-slot={value.adSlot}
          />
        </div>
      );
    },
    callout: ({ value }: any) => {
      const styleColors = {
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
        warning:
          "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
        success:
          "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
        error:
          "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
        tip: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300",
      };

      return (
        <div
          className={`my-8 p-4 rounded-lg border ${styleColors[value.style as keyof typeof styleColors] || styleColors.info}`}
        >
          <PortableTextComponent
            value={value.content}
            components={components}
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    highlight: ({ children }: any) => (
      <mark className="bg-yellow-200 dark:bg-yellow-900/30 px-1 rounded">
        {children}
      </mark>
    ),
    style: ({ children, value }: any) => {
      const style: React.CSSProperties = {};
      if (value.fontFamily) style.fontFamily = value.fontFamily;
      if (value.fontSize) style.fontSize = value.fontSize;
      if (value.fontWeight) style.fontWeight = value.fontWeight as any;
      if (value.color) style.color = value.color;

      return <span style={style}>{children}</span>;
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base font-bold mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm font-bold mt-4 mb-2">{children}</h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 italic my-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-zinc-700 dark:text-zinc-300">{children}</li>
  ),
};

interface PortableTextProps {
  value: any;
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
