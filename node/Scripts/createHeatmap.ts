import { readFileSync, writeFileSync } from "fs"
import sharp from "sharp"
import { applyAA } from "../Source/antialiasing"
import { createDensityArray, createFlamesPixelBufferFromDensity } from "../Source/Flames/image"
import { argv, exit } from "process"
import { parseArgs } from "util"
import { getRandomColorPalette } from "../Source/palette"
import { readFlamesMetadataFromFiles } from "../Source/Flames/Flames"
import { json } from "stream/consumers"

const options: {[longOption: string]: any} = {
    "input": { type: 'string', short: "i" },
    "output": { type: 'string', short: "o" },
}

const args = parseArgs({options: options})

if (args.values.input === undefined || args.values.output === undefined) {
        console.log("usage : " + JSON.stringify(options, null, 4))
        exit(1)
}

const input = args.values.input as string
const output = args.values.output as string

const flames = readFlamesMetadataFromFiles(input)
const heatmap = createDensityArray({x: 1920 * 2, y: 1080 * 2}, flames, 10)
writeFileSync(output, JSON.stringify(heatmap))