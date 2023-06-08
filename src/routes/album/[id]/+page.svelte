<script lang="ts">
	import FavoriteButton from './FavoriteButton.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Tracklist from '$lib/Tracklist.svelte';
	export let data;

	$: detail = data.detail;

	$: details = [
		['Year', data.detail.year],
		['Genres', data.detail.genres?.join(', ') ?? 'Unknown'],
		['Styles', data.detail.styles?.join(', ') ?? 'Unknown']
	];

	let submission: FormData | undefined;

	$: favoriteAlbumsHasId = data.favoriteAlbumIds.includes($page.params.id);
	// when submitting, assume the submission has succeeded and the value is flipped
	$: isFavorite = submission ? !favoriteAlbumsHasId : favoriteAlbumsHasId;

	let showOtherArtists = false;
</script>

<div class="mx-auto max-w-4xl space-y-4">
	<div class="grid grid-cols-1 gap-4 xs:grid-cols-3">
		<img src={detail.imageUrl} alt="{detail.title} album cover" width="288" height="288" />
		<div class="col-span-2 space-y-4">
			<h1 class="text-4xl">
				<span class="italic font-bold">{detail.title}</span>, by
				<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
			</h1>
			{#if detail.otherArtists?.length > 0}
				<button
					class="text-lg"
					aria-expanded={showOtherArtists}
					on:click={() => (showOtherArtists = !showOtherArtists)}
					>+ <span class=" underline decoration-dashed">{detail.otherArtists.length} others</span
					></button
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
			{#if data.isLoggedIn}
				<form
					action={isFavorite ? '?/unfavorite' : '?/favorite'}
					method="POST"
					use:enhance={(event) => {
						submission = event.formData;
						return async ({ update, result }) => {
							if (result.type === 'failure') {
								toastStore.trigger({
									message: 'Unable to favorite album',
									background: 'variant-filled-error'
								});
							}
							await update();
							submission = undefined;
						};
					}}
				>
					<FavoriteButton {isFavorite} />
				</form>
			{/if}
		</div>
	</div>

	<h2 class="text-2xl font-bold">Tracklist</h2>
	<Tracklist tracks={detail.tracks} />
</div>
