<script>
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
