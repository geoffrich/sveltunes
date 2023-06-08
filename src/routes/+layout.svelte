<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let data;
	$: title = 'Sveltunes' + ($page.data.title ? ` - ${$page.data.title}` : '');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<header class="flex items-center gap-3 bg-surface-100-800-token p-4 sticky top-0 z-10">
	<a href="/" class="text-xl uppercase font-bold mr-auto">Sveltunes</a>
	{#if data.isLoggedIn}
		<a
			href="/favorites"
			class="text-lg font-bold border-2 rounded-3xl px-4 py-1 no-underline relative"
			>Favorites <span
				class="text-sm text-surface-900 bg-surface-50 rounded-full px-2 py-1 tabular-nums"
				>{data.favoriteAlbumIds.length}</span
			></a
		>
		<form action="/logout" method="POST" use:enhance>
			<button class="btn variant-filled">Logout</button>
		</form>
	{:else}
		<a href="/login">Login</a>
	{/if}
</header>
<main class="p-4">
	<slot />
	<Toast />
</main>
