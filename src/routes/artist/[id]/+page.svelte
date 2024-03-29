<script lang="ts">
	import AlbumGrid from '$lib/AlbumGrid.svelte';

	export let data;

	$: detail = data.detail;

	function insertLinks(description: string) {
		// replace occurences of [a47333] with <a href="/artist/47333">47333</a>
		return description.replace(/\[a(\d+)\]/g, '<a href="/artist/$1">$1</a>');
	}
</script>

<div class="mx-auto max-w-4xl space-y-4">
	<div class="grid grid-cols-1 gap-4 xs:grid-cols-3">
		<img
			src={detail.image.url}
			alt={detail.name}
			width={detail.image.width}
			height={detail.image.height}
		/>
		<div class="col-span-2 space-y-4">
			<h1 class="text-4xl font-bold">
				{detail.name}
			</h1>
			<p>{@html insertLinks(detail.description)}</p>
		</div>
	</div>

	{#if detail.members}
		<h2 class="text-2xl font-bold">Members</h2>
		<ul class="list-decimal pl-5">
			{#each detail.members as member}
				<li><a href={member.url}>{member.name}</a></li>
			{/each}
		</ul>
	{/if}

	<h2 class="text-2xl font-bold" id="releases">Releases</h2>
	{#await data.streamed.releases}
		<AlbumGrid albums={[]} loading />
	{:then releases}
		{@const pagination = releases.pagination}
		<AlbumGrid albums={releases.list} />
		<div class="flex gap-4">
			{#if pagination.page > 1}
				<a href="?page={pagination.page - 1}#releases">Previous</a>
			{/if}
			{#if pagination.page < pagination.pages}
				<a href="?page={pagination.page + 1}#releases">Next</a>
			{/if}
			<span>Page {pagination.page} of {pagination.pages}</span>
		</div>
	{:catch}
		<p>Unable to fetch artist releases</p>
	{/await}
</div>
