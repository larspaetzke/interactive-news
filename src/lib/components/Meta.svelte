<script>
    export let author = "";
    export let date = "";
    export let photographer = "";
</script>

<section>
    {#if author}
        <p><small>Autor: {author}</small></p>
    {/if}
    {#if photographer}
        <p><small>Fotojournalist: {photographer}</small></p>
    {/if}
    {#if date}
        <p><small>Publisert: {date}</small></p>
    {/if}
</section>

<style>
    section {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: 1rem;
        max-width: 40rem;
        width: 100%;
    }
</style>