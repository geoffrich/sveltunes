<script lang="ts">
	import AlbumGrid from '$lib/AlbumGrid.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { promptUndo } from '../../undo/action';
	import { goto, invalidate } from '$app/navigation';

	export let data;
</script>

<AlbumGrid albums={data.albums.map((a) => ({ ...a, url: `/album/${a.id}` }))}>
	<form
		action="?/unfavorite"
		method="POST"
		slot="action"
		let:release
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success' || result.type === 'redirect') {
					// update the data ourselves instead of refetching
					const undo = data.favorites.remove(release.id);
					const wasLastAlbum = data.albums.length === 1;
					promptUndo(release, wasLastAlbum ? `/favorites/artist/${data.id}` : undefined, undo);
				}
				if (result.type === 'redirect') {
					// we need to await so that we're not firing `goto` and `invalidate` simultaneously
					await goto(result.location);
				} else {
					applyAction(result);
				}
				invalidate('app:favorites');
			};
		}}
	>
		<input type="hidden" name="id" value={release.id} />
		<button class="btn-icon variant-filled border-2 border-surface-900" aria-label="remove"
			><Trash /></button
		>
	</form>
</AlbumGrid>
