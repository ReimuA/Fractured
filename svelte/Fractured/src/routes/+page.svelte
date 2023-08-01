<script>
	import ExternalLinks from "./ExternalLinks.svelte";
	import FlamesCanvas from "./FlamesCanvas.svelte";
	import Hamburger from "./Sidebar/Hamburger.svelte";
	import Sidebar from "./Sidebar/Sidebar.svelte";

	let open = true
</script>

<FlamesCanvas/>
<Sidebar bind:open/>
<Hamburger bind:open={open}/>
<ExternalLinks/>