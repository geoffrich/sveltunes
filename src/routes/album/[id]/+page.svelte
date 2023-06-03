<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { afterNavigate } from '$app/navigation';
	export let data;

	$: detail = data.detail;

	$: details = [
		['Year', data.detail.year],
		['Genres', data.detail.genres?.join(', ') ?? 'Unknown'],
		['Styles', data.detail.styles?.join(', ') ?? 'Unknown']
	];

	let submission: FormData | undefined;

	$: isFavorite = submission ? !data.isFavorite : data.isFavorite;

	afterNavigate(() => {
		submission = undefined;
	});
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
			<form
				action={isFavorite ? '?/unfavorite' : '?/favorite'}
				method="POST"
				use:enhance={(event) => {
					// TODO: better way?
					submission = event.formData;
					return async ({ update, result }) => {
						if (result.type === 'failure') {
							// TODO: non-enhanced?
							toastStore.trigger({
								message: 'Unable to favorite album',
								background: 'variant-filled-error'
							});
							submission = undefined;
						}
						await update();
					};
				}}
			>
				<input type="hidden" name="id" value={$page.params.id} />
				<button
					class="btn border-2"
					class:variant-filled={!isFavorite}
					class:variant-filled-secondary={isFavorite}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						class:fill-red-600={isFavorite}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
					<span>Love</span>
				</button>
			</form>
		</div>
	</div>

	<h2 class="text-2xl font-bold">Tracklist</h2>
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
