<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { afterNavigate } from '$app/navigation';
	import Tracklist from '$lib/Tracklist.svelte';
	import Heart from '$lib/icons/Heart.svelte';
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

	afterNavigate(() => {
		submission = undefined;
	});
</script>

<div class="mx-auto max-w-4xl space-y-4">
	<div class="grid grid-cols-1 gap-4 xs:grid-cols-3">
		<img src={detail.imageUrl} alt="{detail.title} album cover" width="288" height="288" />
		<div class="col-span-2 space-y-4">
			<h1 class="text-4xl">
				<span class="italic font-bold">{detail.title}</span>, by
				<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
				<!-- TODO: a11y -->
				{#if detail.otherArtists?.length > 0}
					<span class="text-lg" title={detail.otherArtists.map((a) => a.name).join(', ')}
						>+ <span class=" underline decoration-dashed">{detail.otherArtists.length} others</span
						></span
					>
				{/if}
			</h1>

			<dl>
				{#each details as [key, value]}
					<div class="flex gap-2 text-xl">
						<dt>{key}:</dt>
						<dd>{value}</dd>
					</div>
				{/each}
			</dl>
			<form
				action={isFavorite ? '?/unfavorite' : '?/favorite'}
				method="POST"
				use:enhance={(event) => {
					// TODO: better way?
					submission = event.formData;
					return async ({ update, result }) => {
						if (result.type === 'failure') {
							// TODO: non-enhanced?
							toastStore.trigger({
								message: 'Unable to favorite album',
								background: 'variant-filled-error'
							});
							submission = undefined;
						}
						await update();
					};
				}}
			>
				<input type="hidden" name="id" value={$page.params.id} />
				<button
					class="btn border-2"
					class:variant-filled={!isFavorite}
					class:variant-filled-secondary={isFavorite}
				>
					<Heart class={isFavorite ? 'fill-red-600' : ''} />
					<span>Love</span>
				</button>
			</form>
		</div>
	</div>

	<h2 class="text-2xl font-bold">Tracklist</h2>
	<Tracklist tracks={detail.tracks} />
</div>
