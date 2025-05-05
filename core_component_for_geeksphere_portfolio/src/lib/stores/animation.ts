import { writable } from 'svelte/store';

export const isPageTransitioning = writable(false);
export const isInitialLoad = writable(true);

// Function to handle page transition animations
export const startPageTransition = () => {
    isPageTransitioning.set(true);
    setTimeout(() => {
        isPageTransitioning.set(false);
    }, 1000); // Duration of transition animation
};

// Function to handle initial page load
export const completeInitialLoad = () => {
    isInitialLoad.set(false);
};
