<script lang="ts">
	import FavoriteButton from './FavoriteButton.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Tracklist from '$lib/Tracklist.svelte';
	import AlbumInfo from './AlbumInfo.svelte';
	export let data;

	let submission: FormData | undefined;

	$: favoriteAlbumsHasId = data.favoriteAlbumIds.includes($page.params.id);
	// when submitting, assume the submission has succeeded and the value is flipped
	$: isFavorite = submission ? !favoriteAlbumsHasId : favoriteAlbumsHasId;

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
	<Tracklist tracks={data.detail.tracks} />
</div>
