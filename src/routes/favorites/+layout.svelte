<script lang="ts">
	import { page } from '$app/stores';
	import type { AlbumDetail } from '$lib/types.js';
	export let data;

	$: groupBy = $page.url.searchParams.get('groupBy') ?? $page.data.groupBy ?? 'album';

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
					path: `/favorites/album/${f.id}`
			  }))
			: Object.entries(albumsGroupedByArtist)
					.map(([artist, albums]) => ({
						title: artist,
						subtitle: `${albums.length} album${albums.length > 1 ? 's' : ''}`,
						image: albums[0].thumbnailUrl,
						path: `/favorites/artist/${albums[0].mainArtist.id}`
					}))
					.sort((a, b) => a.title.localeCompare(b.title));
</script>

<h1 class="text-4xl font-bold mb-4">Favorites</h1>

{#if items.length === 0}
	<p class="text-xl">
		You haven't selected any favorites. Maybe <a href="/search">search</a> for some?
	</p>
{:else}
	<div class="grid favorites gap-6">
		<div class="self-start">
			<div class="flex justify-center" data-sveltekit-replacestate>
				{#each [['Album', '?groupBy=album'], ['Artist', '?groupBy=artist']] as [label, href]}
					<a
						{href}
						class="text-center cursor-pointer transition-colors duration-100 px-4 py-2 rounded-tl-container-token rounded-tr-container-token no-underline hover:variant-soft"
						class:border-b-2={groupBy === label.toLowerCase()}
						class:border-surface-900-50-token={groupBy === label.toLowerCase()}>{label}</a
					>
				{/each}
			</div>
			<ul class="rounded-md border-4 border-primary-900">
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
		</div>

		<div>
			<slot />
		</div>
	</div>
{/if}

<style>
	.favorites {
		grid-template-columns: minmax(auto, 300px) minmax(50%, 1fr);
	}
</style>
