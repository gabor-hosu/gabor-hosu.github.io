import { visit } from "unist-util-visit";

export default function rehypeAddLightboxWrapper() {
  console.log("[info]: rehype-add-glightbox-wrapper plugin loaded");
  return (tree, file) => {
    visit(tree, { tagName: "figure" }, (node, index, parent) => {
      const filepath = file.history?.[0] || "";

      if (!filepath.includes("src/content/projects/")) {
        return;
      }

      if (
        !node.properties ||
        !node.properties.className ||
        !node.properties.className.includes("figure")
      ) {
        return;
      }

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
              id: "zoom-toggle",
              className: ["zoom-toggle"],
            },
          },
          {
            // label
            type: "element",
            tagName: "label",
            properties: {
              for: "zoom-toggle",
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
