import { defaultRenderMode, renderModeToNumber, type Flames, type FlamesComponent } from "../Flames";
import { variationToNumber } from "../Variations";
import type { RenderData } from "../render";
import type { FlamesBinding } from "./flamesbinding";
import type { RenderDataBinding } from "./renderDataBinding";

function mapFlamesComponentToView(component: FlamesComponent) {
	return {
		enabled: [component.enabled],
		color: {
			r: [component.color.r],
			g: [component.color.g],
			b: [component.color.b],
		},
		colorPaletteIdx: [component.colorPaletteIndex],
		weight: [component.weight],
		transform: {
			a: [component.transform.a],
			b: [component.transform.b],
			c: [component.transform.c],
			d: [component.transform.d],
			e: [component.transform.e],
			f: [component.transform.f],
		},
		variations: component.weightedVariations.map(x => ({
			weight: [x.weight],
			variation: [variationToNumber(x.variation)]
		}))
	}
}

export function updateGPUBuffer(device: GPUDevice, renderData: RenderData, flames: Flames, renderDataBinding: RenderDataBinding, flamesBinding: FlamesBinding) {
	flamesBinding.structuredView.set({
		resolution: [1920, 1080],
		palette: {
			a: [flames.namedPalette.palette.a.x, flames.namedPalette.palette.a.y, flames.namedPalette.palette.a.z ],
			b: [flames.namedPalette.palette.b.x, flames.namedPalette.palette.b.y, flames.namedPalette.palette.b.z ],
			c: [flames.namedPalette.palette.c.x, flames.namedPalette.palette.c.y, flames.namedPalette.palette.c.z ],
			d: [flames.namedPalette.palette.d.x, flames.namedPalette.palette.d.y, flames.namedPalette.palette.d.z ]
		},
		gammaCorrection: flames.gammaCorrection,
		densityEstimation: {
			enabled: [flames.densityEstimation != null],
			minsigma: [flames.densityEstimation?.minSigma ?? 0],
			maxsigma: [flames.densityEstimation?.maxSigma ?? 0]
		},
		antialiasing: [flames.antialiasing ? 1 : 0],
		renderMode: [renderModeToNumber(flames.renderMode)],
		spaceWarp: {
			zoom: [flames.spaceWarp.zoom],
			rotationalSymmetry: [flames.spaceWarp.rotationalSymmetry],
			mirrorX: [flames.spaceWarp.mirrorX],
			mirrorY: [flames.spaceWarp.mirrorY],
		},
		finalComponent: mapFlamesComponentToView(flames.final),
		components: flames.components.map(mapFlamesComponentToView)
	})

	device.queue.writeBuffer(flamesBinding.buffers.flames, 0, flamesBinding.structuredView.arrayBuffer)

	//device.queue.writeBuffer(renderDataBinding.buffers.pixels, 0, renderData.pixels);
	let renderingAccumulator: Float32Array | null;

	switch (flames.renderMode) {
		case "Default": renderingAccumulator = null; break;
		case "Structural": renderingAccumulator = renderData.colorAccumulator; break;
		case "Structural (Palette)": renderingAccumulator = renderData.paletteAccumulator; break;
		case "Structural (Palette index)": renderingAccumulator = renderData.colorPaletteIndexAccumulator; break;
	}

	//if (renderingAccumulator)
	device.queue.writeBuffer(renderDataBinding.buffers.renderingAccumulator, 0, renderData.paletteAccumulator);
	device.queue.writeBuffer(renderDataBinding.buffers.heatmap, 0, renderData.heatmap)
	device.queue.writeBuffer(renderDataBinding.buffers.heatmapMax, 0, new Uint32Array([renderData.heatmapMax]))
	device.queue.writeBuffer(flamesBinding.buffers.gamma, 0, new Float32Array([flames!.gammaCorrection]))
	device.queue.writeBuffer(flamesBinding.buffers.logDensity, 0, new Float32Array([Number(flames!.renderMode != defaultRenderMode)]))
	device.queue.writeBuffer(flamesBinding.buffers.densityEstimation, 0, new Float32Array([flames?.densityEstimation ? 1 : 0, flames?.densityEstimation?.minSigma ?? 0, flames?.densityEstimation?.maxSigma ?? 0]))
	device.queue.writeBuffer(flamesBinding.buffers.antialiasing, 0, new Float32Array([flames.antialiasing ? 1 : 0]))
}