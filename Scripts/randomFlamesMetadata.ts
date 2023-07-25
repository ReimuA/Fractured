import { writeFileSync } from "fs";
import { createRandomFlames } from "../Source/Flames/random";
import { exit } from "process";

if (process.argv.length != 3) {
    console.error("usage: ./randomFlamesMetadata.ts outfile.metadata.json")
    exit(1)
}

const flames = createRandomFlames({x: 1920, y: 1080})

writeFileSync(process.argv[2], JSON.stringify(flames, null, 2));