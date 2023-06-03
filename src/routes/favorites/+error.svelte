<script>
	import { page } from '$app/stores';
</script>

<p class="p-4 text-xl">{$page.error?.message ?? 'Unable to load favorite.'}</p>
