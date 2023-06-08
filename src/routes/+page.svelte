<script>
	import AlbumGrid from '$lib/AlbumGrid.svelte';
	export let data;
</script>

<div class="max-w-4xl m-auto space-y-4 mt-4">
	<h1 class="text-3xl font-bold text-center">Explore our collection!</h1>
	<form action="/search">
		<input
			class="input max-w-lg h-9 p-4 mx-auto block"
			placeholder="Search"
			aria-label="Search"
			name="search"
		/>
	</form>

	<AlbumGrid albums={data.releases} hideText={true} preloadBehavior={'hover'} />
</div>
