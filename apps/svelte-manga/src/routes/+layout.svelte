<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Feedback from '$lib/components/feedback/Feedback.svelte';
	import '../app.css';
</script>

<Toaster />
<Nav />
<slot />
<Feedback />
<Footer />
