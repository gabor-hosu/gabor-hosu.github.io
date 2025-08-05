// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import rehypeFigure from "rehype-figure";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAddLightboxWrapper from "./src/plugins/rehype-add-lightbox-wrapper";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    "/": "/about",
  },

  integrations: [[icon()], [pagefind()]],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeFigure, { className: "figure", figcaption: true }],
      [
        rehypeAddLightboxWrapper,
        ["src/content/projects/", "src/content/blog/"],
      ],
      rehypeKatex,
    ],
  },
});
