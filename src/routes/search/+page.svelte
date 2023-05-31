<script>
	export let data;
</script>

<div class="space-y-4">
	<h1 class="text-4xl font-bold">Search</h1>

	<form class="space-y-4 max-w-md">
		<div>
			<label for="search" class="label">Search</label>
			<input type="text" id="search" name="search" class="input" value={data.search} />
		</div>

		<div>
			<label for="type" class="label">Type</label>
			<select id="type" class="select" name="type" value={data.type}>
				<option value="master">Album</option>
				<option value="artist">Artist</option>
			</select>
			<div />
		</div>
	</form>

	{#if data.results}
		<h2 class="text-2xl font-bold">Results</h2>

		<ul class="results grid gap-4" data-sveltekit-preload-data="tap">
			{#each data.results as result}
				<li>
					<a href={result.url}
						><img loading="lazy" src={result.imageUrl} alt="" />
						{result.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.results {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
</style>
