<script>
    import Runes from "$lib/components/Runes.svelte";
    export let text = "Hello, world!";
    export let ScrollMagic;
    export let scrollMagicController;
</script>

<p>
    {#each text.split(' ') as word, wordIndex (word+wordIndex)}
        <Runes {word} bind:ScrollMagic bind:scrollMagicController /> 
        {#if wordIndex < text.split(' ').length - 1}
            <span></span>
        {/if}
    {/each}
</p>
  
<style>
    p {
        line-height: 1.6;
        margin: 0 0 2rem 0;
        color: var(--text-color);
    }
    /*span {
        display: inline-block;
        white-space: nowrap;
    }*/
</style>
  