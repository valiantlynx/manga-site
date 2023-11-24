<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import {ScrollToTop, Breadcrumbs} from '@valiantlynx/svelte-ui';
	import LongstripReadingMode from '$lib/components/LongstripReadingMode.svelte';
	import GridReadingMode from '$lib/components/GridReadingMode.svelte';
	import PaginatedReadingMode from '$lib/components/PaginatedReadingMode.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import Share from '$lib/components/share/Share.svelte';

	let data = $page.data.manga;

	let readingMode = 'longstrip'; // Default reading mode

	let currentPage = writable(0);

	
	let currentChapterIndex = data.chapters?.findIndex(
		(chapter: any) => {
			return chapter.value === $page.url.pathname?.replace('/manga', '')
		}
	);

	function setReadingMode(mode: string) {
		readingMode = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}

	let crumbs: any[] = [];
	$: crumbs = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Manga',
			url: '/manga'
		},
		{
			name: data.title,
			url: `/manga/${$page.params.id}`
		},
		{
			name: $page.params.chapterid,
			url: `/manga/${$page.params.id}/${$page.params.chapterid}`
		}
	];
</script>

<svelte:head>
	<title>{data.title + ' - ' + $page.params.chapterid + ' - ' + $page.url.hostname}</title>
	<meta
		name="description"
		content={`${data.title} ${$page.params.chapterid} ${$page.data.siteName}, read ${data.title} ${$page.params.chapterid} ${$page.data.siteName} online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} high quality, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scans, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scan`}
	/>
	<meta
		name="keywords"
		content={data.title +
			', ' +
			data.title +
			' ' +
			$page.params.chapterid +
			', ' +
			data.title +
			' ' +
			$page.params.chapterid +
			' ' +
			$page.url.hostname +
			',' +
			`${data.title} ${$page.params.chapterid} ${$page.data.siteName}, read ${data.title} ${$page.params.chapterid} ${$page.data.siteName} online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} high quality, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scans, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scan`}
	/>
	<meta
		property="og:title"
		content={data.title + ' ' + $page.params.chapterid + ' ' + $page.url.hostname}
	/>
	<meta
		property="og:description"
		content={`${data.title} ${$page.params.chapterid} ${$page.data.siteName}, read ${data.title} ${$page.params.chapterid} ${$page.data.siteName} online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} high quality, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scans, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scan`}
	/>
	<meta property="og:image" content={data?.images[0].imageUrl} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@animevariant" />
	<meta
		name="twitter:title"
		content={data.title + ' ' + $page.params.chapterid + ' ' + $page.url.hostname}
	/>
	<meta
		name="twitter:description"
		content={`${data.title} ${$page.params.chapterid} ${$page.data.siteName}, read ${data.title} ${$page.params.chapterid} ${$page.data.siteName} online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} high quality, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scans, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scan`}
	/>
	<meta name="twitter:image" content={data?.images[0].imageUrl} />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:domain" content={$page.url.href} />
	<meta name="twitter:creator" content="@animevariant" />
	<meta
		name="twitter:image:alt"
		content={data.title + ' ' + $page.params.chapterid + ' ' + $page.url.hostname}
	/>
	<meta name="twitter:label4" content="Total Pages" />
	<meta name="twitter:data4" content={data.images.length} />
	<meta name="twitter:label5" content="Total Chapters" />
	<meta name="twitter:data5" content={data.chapters?.length} />
</svelte:head>

<main class="bg-base-100">
	<Breadcrumbs {crumbs} />
	<h1 class="text-3xl font-bold mb-6 text-center">{data.title} {$page.params.chapterid}</h1>
	<!-- Reading Mode Selection -->
	<div class="mb-4 flex justify-center space-x-4">
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'longstrip' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('longstrip')}
		>
			Long Strip
		</button>

		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'grid' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('grid')}
		>
			Grid
		</button>
		<button
			class="px-4 py-2 rounded-lg btn btn-primary"
			class:selected={readingMode === 'paginated' ? 'bg-blue-500 text-white' : ''}
			on:click={() => setReadingMode('paginated')}
		>
			Paginated
		</button>
	</div>

	<!-- Images Display -->
	{#if readingMode === 'longstrip'}
		<LongstripReadingMode {currentPage} />
	{/if}

	{#if readingMode === 'grid'}
		<GridReadingMode />
	{/if}

	{#if readingMode === 'paginated'}
		<PaginatedReadingMode />
	{/if}

	<!-- Previous and Next Chapter Buttons -->
	<form class="flex justify-end space-x-4 m-4">
		<a
			href={`/manga${data.chapters[currentChapterIndex]?.value}`}
			class="px-4 py-2 rounded-lg btn btn-primary"
			on:click={() => currentChapterIndex++}
		>
			Previous Chapter
		</a>
		{#if currentChapterIndex === 0}
			<a
				href={`/manga/${$page.params.id}`}
				class="px-4 py-2 rounded-lg btn btn-secondary"
			>
				Manga Details
			</a>
		{:else}
			<a
				href={`/manga${data.chapters[currentChapterIndex]?.value}`}
				class="px-4 py-2 rounded-lg btn btn-primary"
				on:click={() => currentChapterIndex--}
			>
				Next Chapter
			</a>
		{/if}
	</form>
	<ScrollToTop />
	<!-- Share -->
	<div class="divider">
		<i class="fa fa-share-alt mx-4"></i>
		If you like this manga, please share it with your friends:
	</div>
	<Share
	title={data.title + ' ' + $page.params.chapterid + ' ' + $page.url.hostname}
	url={$page.url.href}
	image={data?.images[0].imageUrl}
	text={`${data.title} ${$page.params.chapterid} ${$page.data.siteName}, read ${data.title} ${$page.params.chapterid} ${$page.data.siteName} online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} free online, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} high quality, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scans, ${data.title} ${$page.params.chapterid} ${$page.data.siteName} manga scan`}
	hashtags="manga, anime, manga online, manga free online, manga free online, manga high quality, manga scans, manga scan"
/>	
	<Chat />
</main>
