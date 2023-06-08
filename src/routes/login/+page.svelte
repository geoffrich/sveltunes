<script>
	import { enhance } from '$app/forms';

	export let form;
</script>

<div class="space-y-4">
	<h1 class="text-4xl font-bold">Login</h1>

	{#if form?.error}
		<p class="text-error-500">{form.error}</p>
	{/if}

	<form class="space-y-4 max-w-md" method="POST" use:enhance>
		<div>
			<label for="username">Username </label>
			<input type="text" id="username" name="username" class="input" />
		</div>
		<div>
			<label for="password">Password </label>
			<input type="password" id="password" name="password" class="input" />
		</div>
		<button class="btn variant-filled btn-xl">Login</button>
	</form>
</div>
