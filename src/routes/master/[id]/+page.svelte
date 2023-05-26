<script lang="ts">
	export let data;

	$: detail = data.detail;
</script>

<dl>
	<dt>Title</dt>
	<dd>{detail.title}</dd>
	<dt>Artist</dt>
	<dd>{detail.mainArtist.name}</dd>
</dl>
