<script lang="ts">
	import type { Album } from './types';
	export let albums: Album[];
	export let hideText = false;
</script>

<ul class="grid albums gap-4" data-sveltekit-preload-data="tap">
	{#each albums as release}
		<li class="relative">
			<img src={release.imageUrl} alt="" class="pb-2" />
			<svelte:element
				this={release.url ? 'a' : 'span'}
				class="after:absolute after:inset-0"
				href={release.url}
			>
				<span class:sr-only={hideText}>
					{release.title}
					{#if release.year}({release.year}){/if}
				</span>
			</svelte:element>
		</li>
	{/each}
</ul>

<style>
	.albums {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
</style>
