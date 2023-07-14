import { writeFileSync } from "fs"
import { createMSet } from "./Source/mandelbrot"
import { exportToPng } from "./Source/image"

console.log("OUH")
const b= createMSet(52, {x: 1920, y: 1920}, {x: 0, y: 0}, 1)

exportToPng(b)
