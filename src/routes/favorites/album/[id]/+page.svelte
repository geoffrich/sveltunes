<script lang="ts">
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import Tracklist from '$lib/Tracklist.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { promptUndo } from '../../undo/action';
	import { goto, invalidate } from '$app/navigation';
	export let data;

	$: detail = data.album;
</script>

<div class="space-y-4">
	<h2 class="text-4xl leading-snug">
		<a href="/album/{detail.id}" class="italic font-bold">{detail.title}</a>, by
		<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
	</h2>

	<form
		action="?/unfavorite"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success' || result.type === 'redirect') {
					// update the data ourself instead of refetching
					const undo = await data.favorites.remove(Number(data.id));
					promptUndo(detail, {
						redirectTo: `/favorites/album/${data.id}`,
						afterUndo: undo
					});
				}
				// the default redirect behavior calls `invalidateAll`, which will regenerate our `favorites` store. we want to avoid that.
				if (result.type === 'redirect') {
					// we need to await so that we're not firing `goto` and `invalidate` simultaneously
					await goto(result.location);
				} else {
					applyAction(result);
				}
			};
		}}
	>
		<input type="hidden" name="id" value={$page.params.id} />
		<button class="btn border-2 variant-filled-secondary">
			<Trash />
			<span>Un-favorite</span>
		</button>
	</form>

	<Tracklist tracks={detail.tracks} />
</div>
