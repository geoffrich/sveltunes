<script>
	export let data;
</script>

<h1 class="text-4xl font-bold mb-4">Favorites</h1>

<div class="grid grid-cols-4">
	<ul class="bg-primary-900 rounded-md">
		{#each data.favorites as favorite}
			<li class="grid grid-cols-3 gap-2 items-center p-2 hover:bg-surface-900 relative">
				<img src={favorite.thumbnailUrl} alt="" />
				<a
					href="/album/{favorite.id}"
					class="col-span-2 text-lg leading-6 after:absolute after:inset-0">{favorite.title}</a
				>
			</li>
		{/each}
	</ul>

	<div class="col-span-3">
		<slot />
	</div>
</div>
