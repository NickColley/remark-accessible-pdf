import { join } from "node:path";
import { collapseMargins } from "../utils.js";
import computeStyle from "./compute-style.js";
import { baseFontSize } from "./default-styles.js";

let previousMarginBottom = 0;
const addMargin = (document, { marginTop, marginBottom }) => {
  // Collapse margins like in CSS...
  let collapsedMarginTop;
  if (marginTop) {
    collapsedMarginTop = collapseMargins(previousMarginBottom, marginTop);
  }
  const moveDownBy = collapsedMarginTop || marginBottom;
  // Reset fontSize so margin is always set the same...
  document.fontSize(baseFontSize).moveDown(moveDownBy);
  // Store the last marginBottom value so we can compare and collapse them later...
  if (marginBottom) {
    previousMarginBottom = marginBottom;
  }
};

const handlers = {
  link(document, node, { fontColor, fontFamily, fontSize, lineHeight, width }) {
    const { url, inline } = node;
    return document
      .fillColor(fontColor)
      .font(fontFamily)
      .fontSize(fontSize)
      .text(node.value, {
        lineGap: lineHeight,
        width,
        underline: true,
        link: url,
        continued: inline,
      });
  },
  text(document, node, { fontColor, fontFamily, fontSize, lineHeight, width }) {
    const { inline } = node;
    return document
      .fillColor(fontColor)
      .font(fontFamily)
      .fontSize(fontSize)
      .text(node.value, {
        lineGap: lineHeight,
        width,
        underline: false,
        continued: inline,
      });
  },
  image(document, node, { width }, context) {
    const { currentDirectory } = context;
    const imagePath = join(currentDirectory, node.value);
    return document.image(imagePath, {
      width,
    });
  },
  list(
    document,
    node,
    {
      fontColor,
      fontFamily,
      fontSize,
      width,
      lineHeight,
      bulletRadius,
      textIndent,
      bulletIndent,
    }
  ) {
    const listItem = node.children;
    const { listType } = node;
    return document
      .fillColor(fontColor)
      .font(fontFamily)
      .fontSize(fontSize)
      .list(listItem, {
        listType,
        lineGap: lineHeight,
        width,
        bulletRadius,
        textIndent,
        bulletIndent,
      });
  },
  unknown(document, node) {
    console.log("[compiler] unknown node", node.type);
  },
};

const getLeafNode = (name) =>
  handlers[name] ? handlers[name] : handlers["unknown"];

export default function addStruct(
  document,
  section,
  node,
  context,
  topLevel = true
) {
  section.add(
    document.struct(node.tagName, node.props, () => {
      const { marginTop, marginBottom, ...styles } = computeStyle(
        document,
        node.tagName
      );
      if (topLevel) {
        addMargin(document, { marginTop });
      }
      node.children.forEach((leaf) => {
        if (leaf.type === "struct") {
          return addStruct(document, section, leaf, context, false);
        }
        getLeafNode(leaf.type)(document, leaf, styles, context);
      });
      if (topLevel) {
        addMargin(document, { marginBottom });
      }
    })
  );
}
