import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter()
		adapter: adapter({
            // Fallback-Seite (z.B. für Single Page Apps)
            fallback: 'index.html',
        }),
		paths: {
            base: '/journalist',  // Basis-URL für die Anwendung
        },
	}
};

export default config;
