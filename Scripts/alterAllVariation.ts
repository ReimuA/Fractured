import { readFileSync, writeFileSync } from "fs"
import { argv, exit } from "process"
import { alterAllVariation } from "../Source/Flames/deviation"
import { parseArgs } from "util"
import { mix } from "../Source/mathu"

 function alterVariationScripts(flamesPath: string, variationName: string, factor: number) {
	const rawFlames = readFileSync(flamesPath)
	const flames = JSON.parse(rawFlames.toString())

    return alterAllVariation(flames, variationName, factor)
}

const options: {[longOption: string]: any} = {
    "batch": { type: 'string', short: "b" },
    "input": { type: 'string', short: "i" },
    "output": { type: 'string', short: "o" },
    "variation": { type: 'string', short: "v" },
    "factor": { type: 'string', short: "f" },
}

const args = parseArgs({options: options})

if (args.values.input === undefined
    || args.values.output === undefined
    || args.values.variation === undefined
    || args.values.factor === undefined) {
        console.log("usage : " + JSON.stringify(options, null, 4))
        exit(1)
}

const batch = args.values.batch === undefined ? undefined : parseInt(args.values.batch as string) 
const factor = parseFloat(args.values.factor as string) 
const input = args.values.input as string
const output = args.values.output as string
const variation = args.values.variation as string

if (batch === undefined) {
    let flames = alterVariationScripts(input, variation, factor)
    writeFileSync(output, JSON.stringify(flames, null, 4))   
} else {
    for (let i = 0; i < batch; i++){
        let currentOutput = output.replace("%d", `${i}`)
        let currentFactor = mix(1, factor, (i + 1) / batch)
        console.log(1, currentFactor, i / batch)
        let flames = alterVariationScripts(input, variation, currentFactor)
        writeFileSync(currentOutput, JSON.stringify(flames, null, 4))   
    } 
}