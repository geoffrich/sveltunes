<script lang="ts">
	export let data;

	$: detail = data.detail;
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
			<p>{detail.description}</p>
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
		<p>Loading releases...</p>
	{:then releases}
		{@const pagination = releases.pagination}
		<ul class="grid albums gap-4" data-sveltekit-preload-data="tap">
			{#each releases.list as release}
				<li>
					<a href={release.url}>
						<img src={release.imageUrl} alt="" class="pb-2" />
						{release.title} ({release.year})</a
					>
				</li>
			{/each}
		</ul>
		<div class="flex gap-4">
			<!-- TODO: pagination component -->
			{#if pagination.page > 1}
				<a href="?page={pagination.page - 1}#releases">Previous</a>
			{/if}
			{#if pagination.page < pagination.pages}
				<a href="?page={pagination.page + 1}#releases">Next</a>
			{/if}
			<span>Page {pagination.page} of {pagination.pages}</span>
		</div>
	{/await}
</div>

<style>
	.albums {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
</style>
