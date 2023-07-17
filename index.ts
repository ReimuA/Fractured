import { createRandomFlamesFromFile, createRandomFlamesImages } from "./Source/Flames"

console.log("OUH")

async function main() {
	await createRandomFlamesFromFile("output/nice.metadata.json")
}

main()
