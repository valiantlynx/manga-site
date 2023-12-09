<script>
    import '$lib/styles/app.css'
    import '$lib/styles/tailwind.css'
  import { onMount } from 'svelte';

    async function detectServiceWorkerUpdate() {
        const registration = await navigator.serviceWorker.ready

        registration.addEventListener('updatefound', () => {
            const newServiceWorker = registration.installing
            newServiceWorker?.addEventListener('statechange', () => {
                if (newServiceWorker.state == 'installed') {
                    if (confirm('New update Available! Reload to update')) {
                        newServiceWorker.postMessage({type: 'SKIP_WAITING'})
                        window.location.reload
                    }
                }
            })
        })
    }

    onMount(() => {
        detectServiceWorkerUpdate()
    });
</script>

<slot/>