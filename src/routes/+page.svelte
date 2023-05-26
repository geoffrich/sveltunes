<script>
	export let data;
</script>

<div class="max-w-prose m-auto">
	<h1 class="text-3xl font-bold text-center">Svmusic</h1>
	<p class="text-xl text-center">Explore our collection!</p>
	<ul class="grid grid-cols-5 gap-4 albums">
		{#each data.releases as item}
			<li>
				<a href={item.url}><img src={item.imageUrl} alt="{item.title} cover" /></a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.albums {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
</style>
