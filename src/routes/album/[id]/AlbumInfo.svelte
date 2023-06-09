<script lang="ts">
	import type { AlbumDetail } from '$lib/types';

	export let detail: AlbumDetail;
	let showOtherArtists = false;

	$: details = [
		['Year', detail.year],
		['Genres', detail.genres?.join(', ') ?? 'Unknown'],
		['Styles', detail.styles?.join(', ') ?? 'Unknown']
	];
</script>

<h1 class="text-4xl">
	<span class="italic font-bold">{detail.title}</span>, by
	<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
</h1>
{#if detail.otherArtists?.length > 0}
	<button
		class="text-lg"
		aria-expanded={showOtherArtists}
		on:click={() => (showOtherArtists = !showOtherArtists)}
		>+ <span class=" underline decoration-dashed">{detail.otherArtists.length} others</span></button
	>
	{#if showOtherArtists}
		<span class="text-lg">{detail.otherArtists.map((a) => a.name).join(', ')}</span>
	{/if}
{/if}

<dl>
	{#each details as [key, value]}
		<div class="flex gap-2 text-xl">
			<dt>{key}:</dt>
			<dd>{value}</dd>
		</div>
	{/each}
</dl>
