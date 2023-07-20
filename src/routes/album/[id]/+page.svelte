<script lang="ts">
	import FavoriteButton from './FavoriteButton.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Tracklist from '$lib/Tracklist.svelte';
	import AlbumInfo from './AlbumInfo.svelte';
	import { invalidate } from '$app/navigation';
	export let data;

	let submission: FormData | undefined;

	// when submitting, assume the submission has succeeded and the value is flipped
	$: isFavorite = submission ? !data.isFavorite : data.isFavorite;

	let controller: AbortController;
</script>

<div class="mx-auto max-w-4xl space-y-4">
	<div class="grid grid-cols-1 gap-4 xs:grid-cols-3">
		<img
			src={data.detail.imageUrl}
			alt="{data.detail.title} album cover"
			width="288"
			height="288"
		/>
		<div class="col-span-2 space-y-4">
			<AlbumInfo detail={data.detail} />

			{#if data.isLoggedIn}
				<form
					action={isFavorite ? '?/unfavorite' : '?/favorite'}
					method="POST"
					use:enhance={(event) => {
						if (controller) {
							controller.abort();
						}
						controller = event.controller;
						// if a submission was already in progress, then the next one cancels it out
						if (submission) {
							submission = undefined;
							event.cancel();
							return;
						}
						submission = event.formData;
						return async ({ result }) => {
							if (result.type === 'failure') {
								toastStore.trigger({
									message: 'Unable to favorite album',
									background: 'variant-filled-error'
								});
							}
							// invalidate will reset the data prop, so we need to store the new value
							let newFavorite = !data.isFavorite;
							await invalidate('app:favorites');
							submission = undefined;
							// override the data ourselves instead of refetching
							data.isFavorite = newFavorite;
						};
					}}
				>
					<FavoriteButton {isFavorite} />
				</form>
			{/if}
		</div>
	</div>

	<h2 class="text-2xl font-bold">Tracklist</h2>
	<Tracklist tracks={data.detail.tracks} />
</div>
