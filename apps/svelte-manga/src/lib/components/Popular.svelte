<script lang="ts">
	import MangaCardPb from '$lib/components/MangaCardPb.svelte';
	import AnimevariantGridAds from './AnimevariantGridAds.svelte';
	import PaginationSimple from './PaginationSimple.svelte';
	import { page } from '$app/stores';

	console.log($page);


</script>

<main class="bg-base-100 mx-4">
	<h2 class="text-2xl font-bold text-center mb-6 bg-primary rounded-lg text-primary-content">
		Popular
	</h2>
	<PaginationSimple />

	<div class="mx-auto container gap-y-6 gap-x-4">
		{#each ( $page.form?.mangas ? $page.form?.mangas : $page.data.mangas) as manga}
			<MangaCardPb {manga} />
		{/each}
	</div>

	<PaginationSimple />
	<AnimevariantGridAds />
</main>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
</style>
