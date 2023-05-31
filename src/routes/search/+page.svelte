<script lang="ts">
	import AlbumGrid from '$lib/AlbumGrid.svelte';

	export let data;

	let form: HTMLFormElement;
</script>

<div class="space-y-4">
	<h1 class="text-4xl font-bold">Search</h1>

	<form class="space-y-4 max-w-md" bind:this={form}>
		<div>
			<label for="search" class="label">Search</label>
			<input type="text" id="search" name="search" class="input" value={data.search} />
		</div>

		<div>
			<label for="type" class="label">Type</label>
			<select
				id="type"
				class="select"
				name="type"
				value={data.type}
				on:change={() => form.requestSubmit()}
			>
				<option value="master">Album</option>
				<option value="artist">Artist</option>
			</select>
			<div />
		</div>
	</form>

	{#if data.results}
		<h2 class="text-2xl font-bold">Results</h2>
		<AlbumGrid albums={data.results} />
	{/if}
</div>
