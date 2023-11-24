<script>
	import { page } from '$app/stores';
	import { ContentCardImage } from '@valiantlynx/svelte-ui';

    const similarManga = $page.data.similarManga;
</script>

<div class=" space-y-4  pb-4 border border-primary m-4 bg-base-200">
	<h2 class="text-2xl font-bold mb-4 bg-primary text-primary-content rounded-b-md w-full">
		<i class="fa fa-book mx-2"></i>
		Checkout similar manga
	</h2>
    <div class="mx-auto container gap-y-6 gap-x-4 px-4">
        {#each similarManga as manga}
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
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	}
</style>
