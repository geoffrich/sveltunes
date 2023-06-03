<script>
	export let data;

	$: detail = data.album;
</script>

<div class="space-y-4">
	<h2 class="text-4xl">
		<a href="/album/{detail.id}" class="italic font-bold">{detail.title}</a>, by
		<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
	</h2>

	<ol class="list-decimal pl-5">
		{#each detail.tracks as { duration, title, artists }}
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
</div>
