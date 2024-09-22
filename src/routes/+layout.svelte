<script>
    import 'normalize.css/normalize.css';
    import '../app.css';
    import Modal from '$lib/components/Modal.svelte';

    let showModal = true;
</script>

{#if showModal}
    <Modal on:click={() => showModal = false} />
{/if}

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