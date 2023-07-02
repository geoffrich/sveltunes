import { applyAction } from '$app/forms';
import { goto } from '$app/navigation';
import type { ActionResult } from '@sveltejs/kit';

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function applyActionWithoutInvalidating(result: ActionResult) {
	if (result.type === 'redirect') {
		// the default applyAction behavior calls invalidateAll with goto
		return goto(result.location);
	} else {
		return applyAction(result);
	}
}
