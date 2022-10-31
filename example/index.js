import { unified } from "unified";
import remarkParse from "remark-parse";
import { toVFile, read } from "to-vfile";

import remarkPdf from "../index.js";

console.log();

async function main() {
  const file = await read(toVFile("./example/input.md"));
  await unified()
    .use(remarkParse)
    .use(remarkPdf, { output: "output.pdf" })
    .process(file);
}

main();
