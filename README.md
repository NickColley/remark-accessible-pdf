# Remark (More) Accessible PDF

Render markdown to a PDF using remark and pdfkit.

PDFs are not accessible, use HTML, I was just bored and wondered if this was possible.

```bash
npm install NickColley/remark-accessible-pdf
```

```javascript
import { unified } from "unified";
import { toVFile, read } from "to-vfile";
import remarkParse from "remark-parse";
import remarkAccessiblePDF from "remark-accessible-pdf";

async function createPdf() {
  const inputFile = await read(toVFile("./example/input.md"));
  await unified()
    .use(remarkParse)
    .use(remarkAccessiblePDF, { output: "output.pdf" })
    .process(inputFile);
}

createPdf();
```

See the [example for how to use remark-accessible-pdf](./example/index.js).

## Development status

Not stable, it needs:

- testing with screen readers
- more markdown features supported
- more test examples

## What's the difference between this and [remark-pdf](https://github.com/inokawa/remark-pdf)?

Focus on ensuring the output is accessible including good default styling.
