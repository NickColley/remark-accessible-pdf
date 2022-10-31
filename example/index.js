import { unified } from "unified";
import { toVFile, read } from "to-vfile";
import remarkParse from "remark-parse";
import remarkAccessiblePDF from "../index.js";

async function createPdf() {
  const inputFile = await read(toVFile("./example/input.md"));
  await unified()
    .use(remarkParse)
    .use(remarkAccessiblePDF, { output: "output.pdf" })
    .process(inputFile);
}

createPdf();
