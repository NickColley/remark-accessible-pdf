import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { join } from "node:path";

import { parseValueIntoPoints } from "../utils.js";
import { defaultStyles } from "./default-styles.js";
import addStruct from "./add-struct.js";

export default function compilePast(tree, context) {
  if (tree.type !== "Document") {
    return;
  }
  const document = new PDFDocument({
    pdfVersion: "1.5",
    lang: "en-GB",
    tagged: true,
    displayTitle: true,
    autoFirstPage: false,
  });
  const { currentDirectory, input, output } = context;
  const outputPath = join(currentDirectory, output);
  const inputPath = join(currentDirectory, input);
  const stream = document.pipe(createWriteStream(outputPath));
  stream.on("finish", () => {
    console.log(`Created PDF "${outputPath}" from "${inputPath}"...`);
  });
  const margin = parseValueIntoPoints(document, defaultStyles.root.margin);
  document.addPage({ margin });
  document.info["Title"] = "Test Document";
  const body = document.struct("Document");
  document.addStructure(body);
  tree.children.forEach((node) => {
    addStruct(document, body, node, context);
  });
  body.end();
  document.end();
  return document;
}
