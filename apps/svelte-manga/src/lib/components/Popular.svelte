<script lang="ts">
	import AnimevariantGridAds from './AnimevariantGridAds.svelte';
	import PaginationSimple from './PaginationSimple.svelte';
	import { page } from '$app/stores';
	import {ContentCardImage} from '@valiantlynx/svelte-ui';
</script>

<main class="bg-base-100 mx-4">
	<h2 class="text-2xl font-bold text-center mb-6 bg-primary rounded-lg text-primary-content">
		Popular
	</h2>

	<div class="col-span-full flex justify-end w-full">
		<PaginationSimple action="?/popular" disabled={!$page.data.popularMangas} />
	</div>

	<div class="mx-auto container gap-y-6 gap-x-4">
		{#each ( $page.form?.popularMangas ? $page.form?.popularMangas : $page.data.popularMangas) as manga}

			<ContentCardImage 
			link={'/manga/' + manga.sourceid}
			img={manga.img}
			alt={manga.title}
			label1={manga.title}
			label2={manga.latestChapter}
			title={manga.title}
			 >
			 <label class="cursor-auto text-secondary" for="rating-8">{manga.views}</label>
			</ContentCardImage>
		{/each}
	</div>

	<div class="col-span-full flex justify-end w-full">
		<PaginationSimple action="?/popular" disabled={!$page.data.popularMangas} />
	</div>
	<AnimevariantGridAds />
</main>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
</style>
