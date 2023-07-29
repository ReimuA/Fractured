import { readFileSync, writeFileSync } from "fs"
import { argv, exit } from "process"
import { rebalanceWeight } from "../Source/Flames/deviation"

async function rebalanceWeightScript(flamesPath: string, componentIdx: number, weightDeviation: number, outfile: string) {
	const rawFlames = readFileSync(flamesPath)
	const flames = JSON.parse(rawFlames.toString())

    rebalanceWeight(flames, componentIdx, weightDeviation)
    writeFileSync(outfile, JSON.stringify(flames, null, 2))   
}

if (argv.length != 6)
{
    console.error("Usage: ./rebalanceWeightScript flames.json componentIdx weightDeviation outfile")
    console.error("Provided argument: " + argv)
    exit(1)
}

rebalanceWeightScript(argv[2], parseInt(argv[3]), parseInt(argv[4]), argv[5])