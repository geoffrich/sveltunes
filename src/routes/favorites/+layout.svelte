<script>
	import { page } from '$app/stores';
	export let data;

	$: selectedId = $page.params.id;
	$: favorites = data.favorites.sort((a, b) => a.title.localeCompare(b.title));
</script>

<h1 class="text-4xl font-bold mb-4">Favorites</h1>

<div class="grid favorites gap-6">
	<ul class="rounded-md border-4 border-primary-900">
		{#each favorites as favorite}
			{@const isSelected = favorite.id.toString() === selectedId}
			<li
				class="grid grid-cols-3 gap-2 items-center p-2 relative {isSelected
					? 'bg-surface-900'
					: 'bg-primary-900 hover:bg-surface-900'}"
			>
				<img src={favorite.thumbnailUrl} alt="" class="hidden sm:block" />
				<a
					href="/favorites/{favorite.id}"
					class="col-span-full sm:col-span-2 text-base sm:text-xl leading-6 no-underline after:absolute after:inset-0"
					><span class:font-bold={isSelected}>{favorite.title}</span> <br /><span class="text-sm"
						>{favorite.mainArtist.name}</span
					></a
				>
			</li>
		{/each}
	</ul>

	<div>
		<slot />
	</div>
</div>

<style>
	.favorites {
		grid-template-columns: minmax(auto, 300px) minmax(50%, 1fr);
	}
</style>
