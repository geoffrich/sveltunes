<script lang="ts">
	export let data;

	$: detail = data.detail;

	$: details = [
		['Year', data.detail.year],
		['Genres', data.detail.genres?.join(', ') ?? 'Unknown'],
		['Styles', data.detail.styles?.join(', ') ?? 'Unknown']
	];
</script>

<div class="mx-auto max-w-4xl space-y-4">
	<div class="grid grid-cols-1 gap-4 xs:grid-cols-3">
		<img src={detail.imageUrl} alt="{detail.title} album cover" width="288" height="288" />
		<div class="col-span-2 space-y-4">
			<h1 class="text-4xl">
				<span class="italic font-bold">{detail.title}</span>, by
				<a href={detail.mainArtist.url}>{detail.mainArtist.name}</a>
				<!-- TODO: a11y -->
				{#if detail.otherArtists?.length > 0}
					<span class="text-lg" title={detail.otherArtists.map((a) => a.name).join(', ')}
						>+ <span class=" underline decoration-dashed">{detail.otherArtists.length} others</span
						></span
					>
				{/if}
			</h1>

			<dl>
				{#each details as [key, value]}
					<div class="flex gap-2 text-xl">
						<dt>{key}:</dt>
						<dd>{value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>

	<h2 class="text-2xl font-bold">Tracklist</h2>
	<ol class="list-decimal pl-5">
		{#each detail.tracks as { duration, title }}
			<li>
				{title}
				{#if duration}({duration}){/if}
			</li>
		{/each}
	</ol>
</div>
