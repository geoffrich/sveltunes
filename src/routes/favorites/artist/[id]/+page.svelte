<script>
	import AlbumGrid from '$lib/AlbumGrid.svelte';

	export let data;
</script>

<AlbumGrid albums={data.albums.map((a) => ({ ...a, url: `/album/${a.id}` }))} />
