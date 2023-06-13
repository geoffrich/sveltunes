<script lang="ts">
	import type { Album } from './types';
	export let albums: Album[];
	export let hideText = false;
	export let preloadBehavior: 'tap' | 'hover' = 'tap';
	export let loading = false;
</script>

{#if loading}
	<ul class="grid albums gap-4">
		{#each Array(12) as _}
			<li>
				<div class="placeholder animate-pulse" />
			</li>
		{/each}
	</ul>
{:else}
	<ul
		class="grid albums gap-4"
		data-sveltekit-preload-data={preloadBehavior}
		data-sveltekit-preload-code="hover"
	>
		{#each albums as release}
			<li class="relative">
				<div class="relative pb-2">
					<img src={release.imageUrl} alt="" />
					<div class="absolute bottom-3 right-1 z-10">
						<slot name="action" {release} />
					</div>
				</div>

				<a class="after:absolute after:inset-0" href={release.url || undefined}>
					<span class:sr-only={hideText}>
						{release.title}
						{#if release.year}({release.year}){/if}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.albums {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}

	.placeholder {
		min-height: 160px;
	}
</style>
