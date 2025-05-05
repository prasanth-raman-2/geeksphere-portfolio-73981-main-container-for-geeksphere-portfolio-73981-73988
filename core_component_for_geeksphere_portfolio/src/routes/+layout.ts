import { startPageTransition } from '$lib/stores/animation';
import type { LayoutLoad } from './$types';

export const load = (() => {
    startPageTransition();
    return {};
}) satisfies LayoutLoad;
