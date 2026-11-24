// One-Line Office Joke: 24-Hour Sprint — entry program.
//
// Writes a single-line joke about office life to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The gate: 1-200 characters, one line, non-blank, no leading or
// trailing whitespace, no trailing newline in the output file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The Wi-Fi password is on a sticky note stuck to the router, which lives in a locked cupboard whose key is in an email you need the Wi-Fi to open.";

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const chars = [...JOKE].length;
if (chars < 1 || chars > 200) fail(`line is ${chars} characters, must be 1-200`);
if (JOKE.includes("\n") || JOKE.includes("\r")) fail("line must be a single line");
if (/[\u0000-\u001f\u007f]/.test(JOKE)) fail("line must not contain control characters");
if (JOKE.trim() !== JOKE) fail("line must not start or end with whitespace");
if (JOKE.trim().length === 0) fail("line must not be blank");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
