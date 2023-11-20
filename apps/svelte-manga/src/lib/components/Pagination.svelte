<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';

	export let action = "?/chapters";
	let loading = false;

	const submitPageNo = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
	let pageNo = 1;
	let pageNumbers = $page.data.pageNumbers;
</script>

<form
	action={action}
	method="POST"
	class="flex justify-center my-2"
	use:enhance={submitPageNo}
>
<div class="w-full">
	<!-- pagination -->
	<div class="join">
		<button
			type="submit"
			class="join-item btn btn-primary"
			value={pageNo - 1}
			name="page"
			on:click={() => pageNo--}
			disabled={pageNo === 1}>«</button
		>

		<select class="select select-primary w-full max-w-xs" on:change={submitPageNo}>
			<option disabled selected>{pageNo}</option>
			{#each pageNumbers as pageNumber}
				{#if pageNumber !== pageNo}
					<option value={pageNo}>{pageNumber}</option>
				{/if}
			{/each}
		</select>

		<button
			type="submit"
			class="join-item btn btn-primary"
			value={pageNo + 1}
			name="page"
			on:click={() => pageNo++}
			disabled={pageNo === pageNumbers.length}>»</button
		>
		<!--for some reason, $currentPage is a string for the last button, so I have to convert it to a number-->
	</div>
</div>
</form>
