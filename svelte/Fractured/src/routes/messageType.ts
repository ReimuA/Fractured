export type FlamesWorkerMessage = {
    rawFlames: string
    resetType: "full" | "soft" | "none" | "init"
    canvasContext?: OffscreenCanvas
}
