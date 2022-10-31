import { baseFontSize } from "./compile/default-styles.js";

export function stripUnit(value) {
  if (!value) {
    return value;
  }
  if (typeof value === "number") {
    return value;
  }
  return parseFloat(value.replace(/[^\d.-]/g, "").trim());
}

export function parseValueIntoPoints(document, value, fontSize = baseFontSize) {
  const number = stripUnit(value);
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      return getWidthByPercentage(document, number);
    }
    if (value.endsWith("px")) {
      return number;
    }
    if (value.endsWith("em")) {
      return number * fontSize;
    }
  }
  return value;
}

export function getWidthByPercentage(document, percentage) {
  const { width, margins } = document.page;
  return ((width - margins.left - margins.right) / 100) * percentage;
}

// Collapse margins like in CSS
export function collapseMargins(previousMarginBottom, marginTop) {
  const marginDifference = previousMarginBottom - marginTop;
  if (marginDifference > 0) {
    return marginDifference;
  }
  return 0;
}

export function findValue(node) {
  if (node.value) {
    return node.value;
  }
  const values = node.children.map(findValue);
  if (values.length === 1) {
    return values[0];
  }
  return values;
}
