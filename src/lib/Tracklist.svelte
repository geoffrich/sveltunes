<script lang="ts">
	import type { Track } from '$lib/types';
	export let tracks: Track[];
</script>

<ol class="list-decimal pl-5">
	{#each tracks as { duration, title, artists }}
		<li>
			{title}
			{#if artists.length > 0}
				-
				{#each artists as artist, idx}<a href={artist.url}>{artist.name}</a
					>{#if idx < artists.length - 1}, {/if}{/each}
			{/if}
			{#if duration}({duration}){/if}
		</li>
	{/each}
</ol>
