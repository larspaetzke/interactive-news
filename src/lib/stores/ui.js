import { writable } from 'svelte/store';

export const ui = writable({
    darkmode: false,
    parallaxMovement: true,
    locale: 'de',
    localeOptions: [
        { value: 'de', label: 'Deutsch' },
        { value: 'en', label: 'English' },
        { value: 'no', label: 'Norsk' },
    ]
});