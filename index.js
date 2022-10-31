import { basename, dirname } from "node:path";
import compilePast from "./lib/compile/index.js";
import mdastToPast from "./lib/mdast-to-past/index.js";

export default function remarkPdf({ output } = {}) {
  if (!output) {
    throw new Error("Cannot create PDF file, no output option defined.");
  }
  const compiler = (tree, vfile) => {
    const currentDirectory = dirname(vfile.path);
    const input = basename(vfile.path);
    const context = {
      currentDirectory,
      input,
      output,
    };
    return compilePast(tree, context);
  };

  Object.assign(this, { Compiler: compiler });

  return (tree) => {
    return mdastToPast(tree);
  };
}
