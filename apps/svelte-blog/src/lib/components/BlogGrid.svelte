<script>
	import BlogCards from '$lib/components/BlogCards.svelte';
	import { page } from '$app/stores';
	const blogs = $page.data.blogs;
</script>

<div class="flex flex-wrap -m-4 p-10">
	{#each blogs.items as blog (blog.id)}
		<BlogCards blog={blog} />
	{/each}
</div>
