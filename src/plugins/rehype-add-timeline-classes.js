/* eslint-env browser */
import { visit } from "unist-util-visit"; // doesn't gives as ancestor list of a node
import { visitParents } from "unist-util-visit-parents";

export default function rehypeAddTimelineClasses(allowedDirs) {
  console.log("[info]: rehype-add-timeline-classes plugin loaded");
  return (tree, file) => {
    const filepath = file.history?.[0] || "";

    if (!allowedDirs.some((dir) => filepath.includes(dir))) {
      return;
    }

    // mark containers for tags
    visit(tree, { tagName: "ul" }, (node) => {
      const hasLiChildWithChildCode = Array.from(node.children).some(
        (c) =>
          c.tagName === "li" && c.children && c.children[0].tagName === "code",
      );
      if (!hasLiChildWithChildCode) {
        return;
      }

      node.properties = node.properties || {};
      node.properties.className = node.properties.className || [];
      node.properties.className.push("tag-container");
    });

    // mark timelines
    visitParents(tree, "element", (node, ancestors) => {
      if (node.tagName === "ul") {
        const hasUlAncestor = ancestors.some((a) => a.tagName === "ul");
        if (!hasUlAncestor) {
          node.properties = node.properties || {};
          node.properties.className = node.properties.className || [];
          node.properties.className.push("timeline-list");
        }
      }
    });
  };
}
