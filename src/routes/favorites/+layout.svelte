<script lang="ts">
	import { page } from '$app/stores';
	import type { AlbumDetail } from '$lib/types.js';
	export let data;

	let groupBy = $page.url.searchParams.get('groupBy') ?? 'album';
	let form: HTMLFormElement;

	$: favorites = data.favorites.sort((a, b) => a.title.localeCompare(b.title));

	$: albumsGroupedByArtist = favorites.reduce<Record<string, AlbumDetail[]>>((acc, album) => {
		const artist = album.mainArtist.name;
		if (!acc[artist]) acc[artist] = [];
		acc[artist].push(album);
		return acc;
	}, {});

	$: items =
		groupBy === 'album'
			? favorites.map((f) => ({
					title: f.title,
					subtitle: f.mainArtist.name,
					image: f.thumbnailUrl,
					path: `/favorites/${f.id}`
			  }))
			: Object.entries(albumsGroupedByArtist).map(([artist, albums]) => ({
					title: artist,
					subtitle: `${albums.length} album${albums.length > 1 ? 's' : ''}`,
					image: albums[0].thumbnailUrl,
					path: `/favorites/artist/${albums[0].mainArtist.id}`
			  }));
</script>

<h1 class="text-4xl font-bold mb-4">Favorites</h1>
<form class="space-y-2 mb-4" bind:this={form} on:change={() => form.requestSubmit()}>
	<!-- TODO: no JS version? -->
	<label class="flex items-center space-x-2">
		<input class="radio" type="radio" name="groupBy" value="album" bind:group={groupBy} />
		<span>Album</span>
	</label>
	<label class="flex items-center space-x-2">
		<input class="radio" type="radio" name="groupBy" value="artist" bind:group={groupBy} />
		<span>Artist</span>
	</label>
</form>

<div class="grid favorites gap-6">
	<ul class="rounded-md border-4 border-primary-900 self-start">
		{#each items as favorite}
			{@const isSelected = $page.url.pathname === favorite.path}
			<li
				class="grid grid-cols-3 gap-2 items-center p-2 relative {isSelected
					? 'bg-surface-900'
					: 'bg-primary-900 hover:bg-surface-900'}"
			>
				<img src={favorite.image} alt="" class="hidden sm:block" />
				<a
					href={favorite.path}
					class="col-span-full sm:col-span-2 text-base sm:text-xl leading-snug no-underline after:absolute after:inset-0"
					><span class:font-bold={isSelected}>{favorite.title}</span> <br />
					{#if favorite.subtitle}
						<span class="text-sm">{favorite.subtitle}</span>{/if}</a
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
