<script lang="ts">
    import github from '$lib/images/github.svg'
    import questionmark from '$lib/images/questionmark.svg'
</script>

<div class="absolute bottom-0 right-0 flex">
    <a href="https://flam3.com/flame_draves.pdf">
        <img src={questionmark} width="48" height="48" alt="Flames documentation" class="filter-white m-2 mt-3"/>
    </a>
    <a href="https://github.com/ReimuA/Fractured">
        <img src={github} width="64" height="64" alt="GitHub" class="filter-white m-2"/>
    </a>
</div>

<style lang="postcss">
	:global(html) {
	}

    .filter-white{
        filter: invert(95%) sepia(100%) saturate(0%) hue-rotate(291deg) brightness(102%) contrast(103%);
    }
</style>
