import { defaultRenderMode, type Flames, type FlamesComponent, type RenderMode, type SpaceWarp } from "./Flames";
import { allVariations, getVariationFromname, type Variation } from "./Variations";
import { iRandom, type XY, type iRange } from "./mathu";
import { namedPalettesList, type NamedColorPalette } from "./palette";
import { createRandomTransform, createRandomVariations } from "./random";

export class FlamesBuilder {
    // 1 to 1 field
    public resolution: XY = {x: 1920, y: 1080}
    public superSampleRatio: 1 | 3 = 3
    public renderMode: RenderMode = defaultRenderMode
    public colorPalette: NamedColorPalette = namedPalettesList[0]
    public spaceWarp: SpaceWarp = { rotationalSymmetry: 1, mirrorX: false, mirrorY: false}

    // Field for random generation
    public componentsNumberRange: iRange = {min: 4, max: 4}
    public variationsNumberRange: iRange = {min: 4, max: 14}
    public variationsPools: string[] = []

    withResolution(resolution: XY) {
        this.resolution = resolution
        return this
    }

    withVariations(variationsPools: string[]) {
        this.variationsPools = variationsPools
        return this
    }

    withRendermode(renderMode: RenderMode) {
        this.renderMode = renderMode
        return this
    }

    withNamedPalette(palette: NamedColorPalette) {
        this.colorPalette = palette
        return this
    }

    withSpaceWarp(sw: SpaceWarp) {
        this.spaceWarp = sw
        return this
    }

    withSuperSampleRatio(ratio: 1 | 3) {
        this.superSampleRatio = ratio
        return this
    }

    withComponentsNumberRange(range: iRange) {
        this.componentsNumberRange = range
        return this
    }

    withVariationsNumberRange(range: iRange) {
        this.variationsNumberRange = range
        return this
    }

    private createRandomFlamesComponent(variationsPools: Variation[]): FlamesComponent {
        const weight = Math.random()
        const transform = createRandomTransform()
        const variationsCount = iRandom(this.variationsNumberRange)
        const variations = createRandomVariations(variationsCount, variationsPools)
    
        return {
            color: Math.random(),
            weight,
            transform,
            weightedVariations: variations,
        }
    }
    
    private createRandomFlamesComponents(variationsPools: Variation[]): FlamesComponent[] {
        const componentsCount = iRandom(this.componentsNumberRange)
        const components = new Array<FlamesComponent>(componentsCount)
    
        for (let i = 0; i < componentsCount; i++)
            components[i] = this.createRandomFlamesComponent(variationsPools)
    
        const totalWeight = components.reduce((total, v) => total + v.weight, 0)
    
        for (const c of components)
            c.weight /= totalWeight
    
        return components
    }

    build(): Flames {
        let variationsPools = this.variationsPools.map(e => getVariationFromname(e)!)

        if (variationsPools.length === 0) variationsPools = allVariations

        return {
            resolution: this.resolution,
            superSampleRatio: this.superSampleRatio,
            renderMode: this.renderMode,
            namedPalette: this.colorPalette,
            spaceWarp: this.spaceWarp,
            final: this.createRandomFlamesComponent(variationsPools),
            components: this.createRandomFlamesComponents(variationsPools),
        }
    }
}