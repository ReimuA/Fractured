import { createFern } from "./Source/barnsleyFern"
import { exportFernToPng, exportToPng } from "./Source/image"

console.log("OUH")
const b= createFern(200000000, {x: 4096, y: 4096})

exportFernToPng(b)
