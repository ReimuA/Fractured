import { readFileSync, writeFileSync } from "fs"
import { exportFernToPng, exportToPng } from "./Source/image"
import { processIfs } from "./Source/ifsProcess"
import { createFern } from "./Source/barnsleyFern"
import { createRandomFlamesImages } from "./Source/Flames"

console.log("OUH")

async function main() {
	await createRandomFlamesImages({x: 1920, y: 1080})
	//await exportFernToPng("aaahh.png", createFern(50000000, { x: 1920, y: 1920 }))
	console.log("done")
}

//writeFileSync("fern.json", JSON.stringify(b))
//const b  = JSON.parse(readFileSync("fern.json").toString())
main()
