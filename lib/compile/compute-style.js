import { defaultStyles } from "./default-styles.js";
import { stripUnit, parseValueIntoPoints } from "../utils.js";

const fontMap = {
  "sans-serif": {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
  serif: {
    normal: "Times-Roman",
    bold: "Times-Bold",
  },
};

export default function computeStyle(document, styleSelector) {
  const {
    fontColor,
    fontSize,
    fontFamily,
    fontWeight,
    margin,
    lineHeight,
  } = defaultStyles[styleSelector] || defaultStyles["root"];

  const computedFontColor = fontColor;
  const computedFontSize = parseValueIntoPoints(document, fontSize);
  const computedFontFamily = fontFamily && fontMap[fontFamily][fontWeight];

  const computedMargin = stripUnit(fontSize) * stripUnit(margin) * 0.5;
  const computedMarginTop = parseFloat(computedMargin).toFixed(3);
  const computedMarginBottom = parseFloat(computedMargin).toFixed(3);
  const computedLineHeight = computedFontSize * lineHeight - computedFontSize;

  return {
    fontColor: computedFontColor,
    fontSize: computedFontSize,
    fontFamily: computedFontFamily,
    marginTop: computedMarginTop,
    marginBottom: computedMarginBottom,
    lineHeight: computedLineHeight
  };
}
