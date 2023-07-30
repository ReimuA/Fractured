<script>
	import Header from './Header.svelte';
	import '../app.css'
</script>

<div class="app h-screen">
	<Header />

	<main>
		<slot />
	</main>

</div>

<style lang="postcss">
	:global(html) {}
</style>