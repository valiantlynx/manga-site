<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import {ScrollToTop, Breadcrumbs} from '@valiantlynx/svelte-ui';
	import LongstripReadingMode from '$lib/components/LongstripReadingMode.svelte';
	import GridReadingMode from '$lib/components/GridReadingMode.svelte';
	import PaginatedReadingMode from '$lib/components/PaginatedReadingMode.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import { goto } from '$app/navigation';
	import { postPocketbase, pb, getPocketbase } from '$lib/utils/api';
	import { onMount } from 'svelte';

	let data = $page.data.manga;

	console.log('page ----->', data);

	let readingMode = 'longstrip'; // Default reading mode

	let currentPage = writable(0);

	// filter  all the data.chapters.value that starts with '\n
	data.chapters = data.chapters?.filter((chapter: any) => chapter.value.startsWith('/'));

	let currentChapterIndex = data.chapters?.findIndex(
		(chapter: any) => {
			return chapter.value === $page.url.pathname?.replace('/manga', '')
		}
	);

	function setReadingMode(mode: string) {
		readingMode = mode;
		currentPage.set(0); // Reset current page when switching reading modes
	}

	let crumbs;
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

	// function to update the reading status of the manga on the user record in the users collection, if the manga is not in the user record, add it, else update the reading status of the manga and the reading progress
	let genreIds: any = [];
	let authorIds: any = [];
	async function createOrUpdateReadingProgress(mangaId: string, chapterId: string) {
		// Check if the user is logged in
		if ($page.data.user) {
			const userId = $page.data.user?.id;

			// Check if the manga already exists in the user record
			const existingProgressList = await getPocketbase('reading_progress', {
				filter: `user="${userId}" && manga="${mangaId}"`
			});

			if (existingProgressList.items.length === 0) {
				// If the manga doesn't exist, create it
				const pbData = {
					user: `${userId}`, // This is the user id, not the username
					manga: `${mangaId}`, // This is the manga id, not the manga title
					currentChapter: `${chapterId}`,
					currentChapterIndex: currentChapterIndex,
					totalChapters: data.chapters.length - 1
				};
				await postPocketbase('reading_progress', pbData);
			} else {
				// If a reading progress record exists, update the current chapter
				const readingProgressId = existingProgressList.items[0].id;
				const pbdata = {
					currentChapter: `${chapterId}`,
					currentChapterIndex: currentChapterIndex,
					totalChapters: data.chapters.length - 1
				};
				await pb.collection('reading_progress').update(readingProgressId, pbdata);
			}
		}
	}

	async function createRecord() {
		// if the user is logged in, send the chapter data to pocketbase
		if ($page.data.user) {
			// Check if the manga already exists using some unique identifier, for example, the title
			const existingChapterList = await getPocketbase('Chapters', {
				filter: `src="${$page.url.href}"`
			});

			if (existingChapterList.items.length === 0) {
				// Check if the manga already exists using some unique identifier, for example, the title
				const existingMangaList = await getPocketbase('mangas', {
					filter: `sourceid~"${$page.params.id}"`
				});
				// If a manga record doesn't exist, create it
				if (existingMangaList.items.length === 0) {
					const urlmanga = `/manga/${$page.params.id}`;

					const responsemanga = await fetch(
						import.meta.env.VITE_HOST_URL + `/api/manga/${$page.params.id}?url=${urlmanga}`
					);
					const datamanga = await responsemanga.json();

					// Manga doesn't exist, create it
					for (let i = 0; i < datamanga.author.length; i++) {
						const genreList = await getPocketbase('genres', {
							filter: `name="${datamanga.author[i]}"`
						});

						if (genreList.items.length === 0) {
							const createdAuthor = await postPocketbase('author', {
								name: `${datamanga.author[i]}`
							});

							authorIds.push(createdAuthor.id);
						} else {
							genreIds.push(genreList.items[0].id);
						}
					}

					// create the manga datamanga to send to pocketbase
					const pbDataManga = {
						title: datamanga.title,
						description: datamanga.description,
						img: $page.url.origin + '/api' + datamanga.img,
						updated: datamanga.lastUpdated,
						views: datamanga.views,
						latestChapter: datamanga.episodes[0].chapterTitle,
						sourceid: $page.params.id,
						genres: genreIds,
						authors: authorIds,
						src: $page.url.href
					};
					const mangaRes = await postPocketbase('mangas', pbDataManga);

					// create the chapter data to send to pocketbase
					const pbData = {
						title: data.title,
						chapterId: $page.params.chapterid,
						src: $page.url.href,
						manga: mangaRes.id
					};
					const chapterRes = await postPocketbase('Chapters', pbData);

					// Call the function to create or update the reading progress
					await createOrUpdateReadingProgress(chapterRes.manga, chapterRes.id);
				} else {
					// create the chapter data to send to pocketbase
					const pbData = {
						title: data.title,
						chapterId: $page.params.chapterid,
						src: $page.url.href,
						manga: existingMangaList.items[0].id
					};
					const chapterRes = await postPocketbase('Chapters', pbData);

					// Call the function to create or update the reading progress
					await createOrUpdateReadingProgress(chapterRes.manga, chapterRes.id);
				}
			} else {
				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(
					existingChapterList.items[0].manga,
					existingChapterList.items[0].id
				);
			}
		}
	}

	onMount(async () => {
		await createRecord();
	});

	
</script>

<svelte:head>
	<title>{data.title + ' - ' + $page.params.chapterid + ' - ' + $page.url.hostname}</title>
	<meta
		name="description"
		content={`${data.title} ${$page.params.chapterid} ${$page.url.hostname}, read ${data.title} ${$page.params.chapterid} ${$page.url.hostname} online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} high quality, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scans, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scan`}
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
			`${data.title} ${$page.params.chapterid} ${$page.url.hostname}, read ${data.title} ${$page.params.chapterid} ${$page.url.hostname} online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} high quality, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scans, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scan`}
	/>
	<meta
		property="og:title"
		content={data.title + ' ' + $page.params.chapterid + ' ' + $page.url.hostname}
	/>
	<meta
		property="og:description"
		content={`${data.title} ${$page.params.chapterid} ${$page.url.hostname}, read ${data.title} ${$page.params.chapterid} ${$page.url.hostname} online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} high quality, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scans, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scan`}
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
		content={`${data.title} ${$page.params.chapterid} ${$page.url.hostname}, read ${data.title} ${$page.params.chapterid} ${$page.url.hostname} online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} free online, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} high quality, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scans, ${data.title} ${$page.params.chapterid} ${$page.url.hostname} manga scan`}
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
			href={`${$page.url.origin}/manga${data.chapters[currentChapterIndex]?.value}`}
			class="px-4 py-2 rounded-lg btn btn-primary"
			on:click={() => currentChapterIndex++}
		>
			Previous Chapter
		</a>
		{#if currentChapterIndex === 0}
			<button
				class="px-4 py-2 rounded-lg btn btn-secondary"
				on:click={() => goto(`${$page.url.origin}/manga/${$page.params.id}`)}
			>
				Manga Details
			</button>
		{:else}
			<a
				href={`${$page.url.origin}/manga${data.chapters[currentChapterIndex]?.value}`}
				class="px-4 py-2 rounded-lg btn btn-primary"
				on:click={() => currentChapterIndex--}
			>
				Next Chapter
			</a>
		{/if}
	</form>
	<ScrollToTop />
	<Chat />
</main>
