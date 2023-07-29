import { writeFileSync } from "fs";
import { createRandomFlames } from "../Source/Flames/random";
import { exit } from "process";
import { parseArgs } from "util";

const options: { [longOption: string]: any } = {
    "batch": { type: 'string', short: "b" },
    "output": { type: 'string', short: "o" },
}

const args = parseArgs({ options: options })

if (args.values.output === undefined) {
    console.error(options)
    exit(1)
}

const batch = parseInt((args.values.batch as string) ?? "0")
const output = args.values.output as string

for (let i = 0; i < batch; i++) {
    const flames = createRandomFlames({ x: 1920, y: 1080 })
    const outfile = output.replace("%d", `${i}`)

    writeFileSync(outfile, JSON.stringify(flames, null, 2));
}
