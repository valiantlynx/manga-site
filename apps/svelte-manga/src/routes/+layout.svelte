<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Feedback from '$lib/components/feedback/Feedback.svelte';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<Toaster />
<Nav />
<slot />
{#if $page.url.pathname !== '/manga/*'}
	<Feedback />
{/if}

<Footer />
