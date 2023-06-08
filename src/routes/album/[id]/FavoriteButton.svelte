<script lang="ts">
	import Heart from '$lib/icons/Heart.svelte';

	export let isFavorite: boolean;
</script>

<button
	class="btn border-2"
	class:variant-filled={!isFavorite}
	class:variant-filled-secondary={isFavorite}
>
	<Heart class={isFavorite ? 'fill-red-600' : ''} />
	<span>Favorite</span>
</button>
