<script lang="ts">
	import AlbumGrid from '$lib/AlbumGrid.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { enhance } from '$app/forms';
	import { promptUndo } from '../../undo/action';

	export let data;
</script>

<AlbumGrid albums={data.albums.map((a) => ({ ...a, url: `/album/${a.id}` }))}>
	<form
		action="?/unfavorite"
		method="POST"
		slot="action"
		let:release
		use:enhance={() => {
			return ({ result, update }) => {
				const wasLastAlbum = data.albums.length === 1;
				if (result.type === 'success') {
					promptUndo(release, wasLastAlbum ? `/favorites/artist/${data.id}` : undefined);
				}
				update();
			};
		}}
	>
		<input type="hidden" name="id" value={release.id} />
		<button class="btn-icon variant-filled border-2 border-surface-900" aria-label="remove"
			><Trash /></button
		>
	</form>
</AlbumGrid>
