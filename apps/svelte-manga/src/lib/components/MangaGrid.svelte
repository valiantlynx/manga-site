<script lang="ts">
	import MangaCard from '$lib/components/MangaCard.svelte';
	import { page } from '$app/stores';
	import AnimevariantGridAds from './AnimevariantGridAds.svelte';
	import PaginationSimple from './PaginationSimple.svelte';
</script>

<main class="bg-base-100 mx-4">
	<h2 class="text-2xl font-bold text-center mb-6 bg-primary rounded-lg text-primary-content">
		Latest Manga
	</h2>
	<PaginationSimple  action="?/latest" />
	<div class="mx-auto container gap-y-6 gap-x-4">
		{#each ($page.form?.latestMangas ? $page.form?.latestMangas : $page.data.latestMangas) as manga}
			<MangaCard {manga} />
		{/each}
	</div>
	<PaginationSimple action="?/latest" />
	<AnimevariantGridAds />
</main>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	}
</style>
