<script lang="ts">
	import { canvasRef,  flamesStore } from "../stores";


    let metadataHref = ''
	let metadataName = 'flames.metadata.json'

	// Canvas ref from FlamesCanvas.svelte
	let flamesCanvas: HTMLCanvasElement | undefined;

	canvasRef.subscribe((canvas) => (flamesCanvas = canvas));

	flamesStore.subscribe((value) => {
		updateMetadataLink(value.flames)
	});

	function updateMetadataLink(obj: Object) {
		const blob = new Blob([JSON.stringify(obj, null, 4)], { type: 'application/json' });
		metadataHref = URL.createObjectURL(blob);
		metadataName = 'flames.metadata.json';
	}
	function downloadImage() {
		if (!flamesCanvas) return;
		const link = document.createElement('a');
		link.download = 'flames.png';
		link.href = flamesCanvas.toDataURL();
		link.click();
	}
</script>

<p class="pt-12 pl-6 text-white">Download</p>
<nav class="pl-12 pt-2 text-l">
    <a href={metadataHref} class=" text-white block" download={metadataName} >Metadata</a>
    <button class="text-white block" on:click={() => downloadImage()}>Image</button>
</nav>