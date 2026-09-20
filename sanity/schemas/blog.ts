import { defineType, defineField } from "sanity";

const fontFamilies = [
  { title: "Inter", value: "Inter, sans-serif" },
  { title: "Roboto", value: "Roboto, sans-serif" },
  { title: "Open Sans", value: "Open Sans, sans-serif" },
  { title: "Lato", value: "Lato, sans-serif" },
  { title: "Montserrat", value: "Montserrat, sans-serif" },
  { title: "Poppins", value: "Poppins, sans-serif" },
  { title: "Source Sans Pro", value: "Source Sans Pro, sans-serif" },
  { title: "Raleway", value: "Raleway, sans-serif" },
  { title: "Merriweather", value: "Merriweather, serif" },
  { title: "Playfair Display", value: "Playfair Display, serif" },
  { title: "Georgia", value: "Georgia, serif" },
  { title: "Times New Roman", value: "Times New Roman, serif" },
  { title: "Arial", value: "Arial, sans-serif" },
  { title: "Helvetica", value: "Helvetica, sans-serif" },
  { title: "Verdana", value: "Verdana, sans-serif" },
  { title: "Tahoma", value: "Tahoma, sans-serif" },
  { title: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { title: "Gill Sans", value: "Gill Sans, sans-serif" },
  { title: "Arial Black", value: "Arial Black, sans-serif" },
  { title: "Impact", value: "Impact, sans-serif" },
  { title: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { title: "Courier New", value: "Courier New, monospace" },
  { title: "Lucida Console", value: "Lucida Console, monospace" },
  { title: "Monaco", value: "Monaco, monospace" },
  { title: "Fira Code", value: "Fira Code, monospace" },
  { title: "Source Code Pro", value: "Source Code Pro, monospace" },
  { title: "Ubuntu", value: "Ubuntu, sans-serif" },
  { title: "Oswald", value: "Oswald, sans-serif" },
  { title: "Nunito", value: "Nunito, sans-serif" },
  { title: "Quicksand", value: "Quicksand, sans-serif" },
  { title: "Lora", value: "Lora, serif" },
  { title: "PT Sans", value: "PT Sans, sans-serif" },
  { title: "Work Sans", value: "Work Sans, sans-serif" },
  { title: "Karla", value: "Karla, sans-serif" },
  { title: "DM Sans", value: "DM Sans, sans-serif" },
  { title: "Plus Jakarta Sans", value: "Plus Jakarta Sans, sans-serif" },
  { title: "Bebas Neue", value: "Bebas Neue, sans-serif" },
  { title: "Cabin", value: "Cabin, sans-serif" },
  { title: "Josefin Sans", value: "Josefin Sans, sans-serif" },
  { title: "Libre Baskerville", value: "Libre Baskerville, serif" },
  { title: "Cormorant Garamond", value: "Cormorant Garamond, serif" },
  { title: "Crimson Text", value: "Crimson Text, serif" },
  { title: "EB Garamond", value: "EB Garamond, serif" },
  { title: "Libre Franklin", value: "Libre Franklin, sans-serif" },
  { title: "Mulish", value: "Mulish, sans-serif" },
  { title: "Rubik", value: "Rubik, sans-serif" },
  { title: "Sora", value: "Sora, sans-serif" },
  { title: "Space Grotesk", value: "Space Grotesk, sans-serif" },
  { title: "Urbanist", value: "Urbanist, sans-serif" },
  { title: "Varela Round", value: "Varela Round, sans-serif" },
];

export const schemaTypes = [
  defineType({
    name: "blog",
    title: "Blog Post",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "publishedAt",
        title: "Published At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
      }),
      defineField({
        name: "excerpt",
        title: "Excerpt",
        type: "text",
        rows: 3,
        description: "Short description for SEO and previews",
      }),
      defineField({
        name: "content",
        title: "Content",
        type: "array",
        of: [
          {
            type: "block",
            styles: [
              { title: "Normal", value: "normal" },
              { title: "Heading 1", value: "h1" },
              { title: "Heading 2", value: "h2" },
              { title: "Heading 3", value: "h3" },
              { title: "Heading 4", value: "h4" },
              { title: "Heading 5", value: "h5" },
              { title: "Heading 6", value: "h6" },
              { title: "Quote", value: "blockquote" },
            ],
            lists: [
              { title: "Bullet", value: "bullet" },
              { title: "Numbered", value: "number" },
            ],
            marks: {
              decorators: [
                { title: "Strong", value: "strong" },
                { title: "Emphasis", value: "em" },
                { title: "Underline", value: "underline" },
                { title: "Strike-through", value: "strike-through" },
                { title: "Code", value: "code" },
                { title: "Highlight", value: "highlight" },
              ],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  fields: [
                    {
                      name: "href",
                      type: "string",
                      title: "URL",
                      description: "Enter URL with https:// or http://",
                    },
                  ],
                },
                {
                  name: "style",
                  type: "object",
                  title: "Font Style",
                  fields: [
                    {
                      name: "fontFamily",
                      type: "string",
                      title: "Font Family",
                      options: {
                        list: fontFamilies,
                      },
                    },
                    {
                      name: "fontSize",
                      type: "string",
                      title: "Font Size",
                      options: {
                        list: [
                          { title: "12px", value: "12px" },
                          { title: "14px", value: "14px" },
                          { title: "16px", value: "16px" },
                          { title: "18px", value: "18px" },
                          { title: "20px", value: "20px" },
                          { title: "24px", value: "24px" },
                          { title: "28px", value: "28px" },
                          { title: "32px", value: "32px" },
                          { title: "36px", value: "36px" },
                          { title: "48px", value: "48px" },
                          { title: "64px", value: "64px" },
                        ],
                      },
                    },
                    {
                      name: "fontWeight",
                      type: "string",
                      title: "Font Weight",
                      options: {
                        list: [
                          { title: "100", value: "100" },
                          { title: "200", value: "200" },
                          { title: "300", value: "300" },
                          { title: "400", value: "400" },
                          { title: "500", value: "500" },
                          { title: "600", value: "600" },
                          { title: "700", value: "700" },
                          { title: "800", value: "800" },
                          { title: "900", value: "900" },
                        ],
                      },
                    },
                    {
                      name: "color",
                      type: "string",
                      title: "Text Color",
                    },
                  ],
                },
              ],
            },
          },
          {
            type: "image",
            options: { hotspot: true },
            fields: [
              {
                name: "alt",
                type: "string",
                title: "Alt text",
                description: "Important for accessibility and SEO",
              },
            ],
          },
          {
            name: "videoEmbed",
            type: "object",
            title: "Video Embed",
            fields: [
              {
                name: "url",
                type: "url",
                title: "Video URL",
                description: "YouTube, Vimeo, or other video URL",
              },
              {
                name: "platform",
                type: "string",
                title: "Platform",
                options: {
                  list: [
                    { title: "YouTube", value: "youtube" },
                    { title: "Vimeo", value: "vimeo" },
                    { title: "Custom", value: "custom" },
                  ],
                },
              },
              {
                name: "caption",
                type: "string",
                title: "Caption",
              },
            ],
            preview: {
              select: {
                url: "url",
              },
              prepare({ url }) {
                return {
                  title: "Video",
                  subtitle: url,
                };
              },
            },
          },
          {
            name: "adsense",
            type: "object",
            title: "AdSense Ad",
            fields: [
              {
                name: "adSlot",
                type: "string",
                title: "Ad Slot ID",
                description: "Your Google AdSense ad slot ID",
              },
              {
                name: "adClient",
                type: "string",
                title: "Ad Client ID",
                description: "Your Google AdSense publisher ID (ca-pub-xxx)",
              },
              {
                name: "width",
                type: "number",
                title: "Width",
                initialValue: 300,
              },
              {
                name: "height",
                type: "number",
                title: "Height",
                initialValue: 250,
              },
            ],
            preview: {
              select: {
                adSlot: "adSlot",
              },
              prepare({ adSlot }) {
                return {
                  title: "AdSense Ad",
                  subtitle: adSlot,
                };
              },
            },
          },
          {
            name: "callout",
            type: "object",
            title: "Callout Box",
            fields: [
              {
                name: "content",
                type: "array",
                of: [{ type: "block" }],
              },
              {
                name: "style",
                type: "string",
                title: "Style",
                options: {
                  list: [
                    { title: "Info", value: "info" },
                    { title: "Warning", value: "warning" },
                    { title: "Success", value: "success" },
                    { title: "Error", value: "error" },
                    { title: "Tip", value: "tip" },
                  ],
                },
              },
            ],
          },
        ],
      }),
      defineField({
        name: "coverImage",
        title: "Cover Image",
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alt text",
            description: "Important for accessibility and SEO",
          },
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        description: "Search Engine Optimization settings for this post",
        type: "object",
        fields: [
          defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            description:
              "Override the default page title. Best practice: 50-60 characters, include main keyword at the beginning",
            validation: (Rule) =>
              Rule.max(60).warning(
                "Meta titles longer than 60 characters may be truncated in search results",
              ),
          }),
          defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
            description:
              "Override the default excerpt. Best practice: 150-160 characters, include keywords and call-to-action",
            validation: (Rule) =>
              Rule.max(160).warning(
                "Meta descriptions longer than 160 characters may be truncated in search results",
              ),
          }),
          defineField({
            name: "ogImage",
            title: "Open Graph Image",
            type: "image",
            description:
              "Image shown when sharing on social media (Facebook, Twitter, LinkedIn). Recommended size: 1200x630px",
            options: { hotspot: true },
          }),
          defineField({
            name: "noIndex",
            title: "No Index",
            type: "boolean",
            description:
              "⚠️ Enable this to prevent search engines from indexing this page. Use only for draft or private content.",
            initialValue: false,
          }),
          defineField({
            name: "keywords",
            title: "Keywords",
            type: "array",
            of: [{ type: "string" }],
            description:
              "SEO keywords for this post. Add 3-5 relevant keywords separated by commas. Focus on long-tail keywords.",
            options: {
              layout: "tags",
            },
          }),
        ],
      }),
      defineField({
        name: "author",
        title: "Author",
        type: "string",
      }),
      defineField({
        name: "categories",
        title: "Categories",
        type: "array",
        of: [{ type: "string" }],
        options: {
          layout: "tags",
        },
      }),
    ],
    preview: {
      select: {
        title: "title",
        media: "coverImage",
        publishedAt: "publishedAt",
      },
      prepare({ title, media, publishedAt }) {
        return {
          title,
          media,
          subtitle: publishedAt
            ? new Date(publishedAt).toLocaleDateString()
            : "Draft",
        };
      },
    },
  }),
];
