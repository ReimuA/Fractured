<script>
	import Header from './Header.svelte';
	import '../app.css'
</script>

<div class="app bg-slate-300 h-screen">
	<Header />

	<h1 class="text-3xl font-bold underline">
		Hello world!
	</h1>
	<main>
		<slot />
	</main>

	<footer>
		<p class="text-red-500">visit <a  href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style lang="postcss">
	:global(html) {}
</style>