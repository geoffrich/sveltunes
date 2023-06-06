// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		userId: number;
	}
	// TODO: typesafety not working due to https://github.com/sveltejs/kit/issues/9799
	interface PageData {
		title: string;
	}
	// interface Error {}
	// interface Platform {}
}
