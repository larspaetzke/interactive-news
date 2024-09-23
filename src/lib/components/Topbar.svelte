<script>
    import { onMount } from "svelte";

    import { ui } from "$lib/stores/ui";
    import Toggle from "$lib/components/Toggle.svelte";

    let darkmodeLabel = "Mørk modus";

    // onMount, check if system ui darkmode is enabled
    onMount(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            $ui.darkmode = true;
        } else {
            $ui.darkmode = false;
        }
    });
</script>

<section>
    <div>
        <Toggle
            bind:checked={$ui.darkmode}
            label={darkmodeLabel}
        />
    </div>
</section>

<style>
    section {
        background: var(--gray-ground);
        width: 100%;
    }
    div {
        margin: auto;
        padding: 0.6rem 1rem;
        max-width: 40rem;
    }
</style>