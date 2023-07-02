<script lang="ts">
	import AlbumGrid from '$lib/AlbumGrid.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { enhance } from '$app/forms';
	import { promptUndo } from '../../undo/action';
	import { applyActionWithoutInvalidating } from '$lib/util';

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
					const undo = await data.favorites.remove(release.id);
					const wasLastAlbum = data.albums.length === 1;
					promptUndo(release, {
						redirectTo: wasLastAlbum ? `/favorites/artist/${data.id}` : undefined,
						afterUndo: undo
					});
				}
				applyActionWithoutInvalidating(result);
			};
		}}
	>
		<input type="hidden" name="id" value={release.id} />
		<button class="btn-icon variant-filled border-2 border-surface-900" aria-label="remove"
			><Trash /></button
		>
	</form>
</AlbumGrid>
