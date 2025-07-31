// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import rehypeFigure from "rehype-figure";
import icon from "astro-icon";
import rehypeAddLightboxWrapper from "./src/plugins/rehype-add-lightbox-wrapper";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    "/": "/about",
  },

  integrations: [icon()],
  markdown: {
    rehypePlugins: [
      [rehypeFigure, { className: "figure", figcaption: true }],
      [rehypeAddLightboxWrapper, ["src/content/projects/"]],
    ],
  },
});
