/* eslint-env browser */
import { visit } from "unist-util-visit";

let uniqueId = 0;

export default function rehypeAddLightboxWrapper(allowedDirs) {
  console.log("[info]: rehype-add-glightbox-wrapper plugin loaded");
  return (tree, file) => {
    visit(tree, { tagName: "figure" }, (node, index, parent) => {
      const filepath = file.history?.[0] || "";

      if (!allowedDirs.some((dir) => filepath.includes(dir))) {
        return;
      }

      if (
        !node.properties ||
        !node.properties.className ||
        !node.properties.className.includes("figure")
      ) {
        return;
      }

      const inputId = `zoom-toggle${uniqueId}`;
      uniqueId++;

      const wrapper = {
        // div
        type: "element",
        tagName: "div",
        properties: {
          className: ["zoom-container"],
        },
        children: [
          {
            // checkbox
            type: "element",
            tagName: "input",
            properties: {
              type: "checkbox",
              id: inputId,
              className: ["zoom-toggle"],
            },
          },
          {
            // label
            type: "element",
            tagName: "label",
            properties: {
              for: inputId,
              className: ["zoom-label"],
            },
            children: [node],
          },
        ],
      };

      parent.children[index] = wrapper;
    });
  };
}
