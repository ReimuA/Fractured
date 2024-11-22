<script lang="ts">
	import { canvasRef, flamesStore } from '../stores';

	let metadataHref = '';
	let metadataName = 'flames.metadata.json';

	// Canvas ref from FlamesCanvas.svelte
	let flamesCanvas: HTMLCanvasElement | undefined;

	canvasRef.subscribe((canvas) => (flamesCanvas = canvas));

	flamesStore.subscribe((value) => {
		updateMetadataLink(value.flames);
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

<div>
	<h2>Download</h2>
	<div class="flex flex-col gap-2 pl-6">
		<a href={metadataHref} download={metadataName}>Metadata</a>
		<a class="hover:cursor-pointer" on:click={() => downloadImage()}>Image</a>
	</div>
</div>
