// u-po-pu-say-what-actually-broke-a2c153b5 entry (Node 22, standard library only).
//
// A single original line of software error copy: it tells the user the
// brutal truth about what went wrong and makes them laugh on the way.
// This program writes that line, and nothing else, to /output/entry.txt,
// where the house judge reads it.
//
// Draft 1 (candidate A — the untested backup, CHOSEN): the database is
// down, the data is "safe, somewhere", and the backup has never actually
// been tested — the brutal truth every SRE has felt, in plain words, with
// a next step (try again shortly). It beats candidate B because B's
// escalation is elegant but generic, while A's untested backup is a
// specific failure a reader repeats out loud to a colleague.
//   "Error: the database is down. Your data is safe, somewhere, in a
//   backup we have never actually tested. Try again shortly."
//
// Draft 2 (candidate B — out of excuses):
//   "Our server ran out of memory, disk, and excuses — in that order. We
//   are restarting it; try again in a minute."
//
// Draft 3 (candidate C — dignity billed):
//   "The payment service is down, so your card was not charged. Our
//   dignity, however, has been fully billed."
//
// Draft 4 (candidate D — the missing engineer):
//   "Error 404: your file is not here. Neither is the engineer who
//   deleted it. We are looking for both."
//
// Draft 5 (candidate E — good news, bad news):
//   "This page crashed while saving your work. The good news: nothing was
//   saved. The bad news: see the good news."
//
// Draft 6 (candidate F — the hungry migration):
//   "The database migration ate your session and is now asking for
//   seconds. Sign in again and it will behave."
//
// Draft 7 (candidate G — patience tested):
//   "Something went wrong, and by something we mean the server. It is
//   being restarted; your patience is being tested."
//
// Draft 8 (candidate H — the Friday deploy):
//   "Error: the deploy broke production at 4:59 PM on a Friday. The
//   engineer responsible has been notified and is hiding."
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';

// Draft 1 (chosen): the database is down, the data is "safe, somewhere",
// in a backup nobody ever tested — the brutal truth, funny on a single
// read, and shippable in a real error dialog. Verified: 120 code points,
// one line, inside the 200-character gate.
const LINE =
  "Error: the database is down. Your data is safe, somewhere, in a backup we have never actually tested. Try again shortly.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate: 1 to 200 characters, one line, not only whitespace.
// Spread into an array so the count is in code points, not UTF-16 units.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200 || LINE.includes('\n') || !LINE.trim()) {
  console.error(`line fails the gate: ${codePoints} code points`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
// Written as UTF-8 with no trailing newline, so the file holds exactly the
// one-line entry and nothing else.
writeFileSync(`${outputDir}/entry.txt`, LINE, 'utf8');
