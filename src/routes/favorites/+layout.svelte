<script lang="ts">
	import { page } from '$app/stores';
	import type { AlbumDetail } from '$lib/types.js';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	export let data;

	let groupBy = $page.url.searchParams.get('groupBy') ?? $page.data.groupBy ?? 'album';

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
			: Object.entries(albumsGroupedByArtist).map(([artist, albums]) => ({
					title: artist,
					subtitle: `${albums.length} album${albums.length > 1 ? 's' : ''}`,
					image: albums[0].thumbnailUrl,
					path: `/favorites/artist/${albums[0].mainArtist.id}`
			  }));
</script>

<h1 class="text-4xl font-bold mb-4">Favorites</h1>

{#if items.length === 0}
	<p class="text-xl">
		You haven't selected any favorites. Maybe <a href="/search">search</a> for some?
	</p>
{:else}
	<div class="grid favorites gap-6">
		<div class="self-start">
			<!-- TODO: no-js? -->
			<TabGroup justify="justify-center" border="">
				<Tab bind:group={groupBy} name="groupBy" value="album">Album</Tab>
				<Tab bind:group={groupBy} name="groupBy" value="artist">Artist</Tab>
			</TabGroup>
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
