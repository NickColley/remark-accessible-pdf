import { u } from "unist-builder";
import { findValue } from "../utils.js";

function h(tagName, props, children) {
  if (Array.isArray(props)) {
    children = props;
    props = {};
  }

  return {
    type: "struct",
    tagName,
    props: props || {},
    children: children || [],
  };
}

const handlers = {
  root(h, node) {
    return u("Document", all(h, node));
  },
  heading(h, node) {
    return h("H" + node.depth, all(h, node));
  },
  paragraph(h, node) {
    return h("P", all(h, node));
  },
  list(h, node) {
    const listType = node.ordered ? "numbered" : "bullet";
    return h("L", [u("list", { listType }, all(h, node))]);
  },
  listItem(h, node) {
    return findValue(node);
  },
  image(h, node) {
    const { alt } = node;
    return h("Figure", { alt }, [u("image", node.url)]);
  },
  text(h, node, parent) {
    const index = parent.children.findIndex((n) => n === node);
    const totalSiblings = parent.children.length - 1;
    const inline = index !== totalSiblings;
    return u("text", { inline }, String(node.value));
  },
  link(h, node, parent) {
    const { url } = node;
    const value = findValue(node);
    const index = parent.children.findIndex((n) => n === node);
    const totalSiblings = parent.children.length - 1;
    const inline = index !== totalSiblings;
    const alt = value;
    return h("Link", { alt }, [u("link", { url, inline }, value)]);
  },
};

function unknownHandler(h, node) {
  console.log("[mdast-to-past] unknown node", node.type);
  return h("Div", all(h, node));
}

function all(h, parent) {
  const values = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const result = one(h, nodes[index], parent);

      if (Array.isArray(result)) {
        values.push(...result);
      } else {
        values.push(result);
      }
    }
  }

  return values;
}

function one(h, node, parent) {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  const handler = handlers[type] ? handlers[type] : unknownHandler;

  return handler(h, node, parent);
}

export default function mdastToPast(tree) {
  return one(h, tree);
}
