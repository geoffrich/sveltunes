<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	$: title = 'Sveltunes' + ($page.data.title ? ` - ${$page.data.title}` : '');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<AppShell slotPageContent="p-4">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl uppercase font-bold">Sveltunes</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<Toast />
</AppShell>
