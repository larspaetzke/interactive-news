<script>
    import { onMount } from 'svelte';
    import { ui } from '$lib/stores/ui';

    import 'normalize.css/normalize.css';
    import '../app.css';

    let mounted = false;
    
    // Verwende onMount, um nur im Browser auf das document zuzugreifen
    onMount(() => {
        toggleDarkmodeClass();
        mounted = true;
    });
    
    function toggleDarkmodeClass() {
        if ($ui.darkmode && document && document.body) {
            document.body.classList.add('darkmode');
            document.body.classList.remove('lightmode');
        } else {
            document.body.classList.remove('darkmode');
            document.body.classList.add('lightmode');
        }
    }

    $: $ui.darkmode, mounted ? toggleDarkmodeClass() : null;

</script>

<article>
    <slot />
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
        width: 100%;
    }
</style>