<script>
	export let data;
</script>

<div class="max-w-4xl m-auto flex gap-4 flex-col mt-4">
	<h1 class="text-3xl font-bold text-center">Explore our collection!</h1>
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
