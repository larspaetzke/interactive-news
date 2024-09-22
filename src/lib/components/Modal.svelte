<script>
    import { createEventDispatcher } from "svelte";
    import Button from "$lib/components/Button.svelte";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("click");
    }
</script>

<button
    class="overlay"
    aria-label="Lukk"
    on:click={handleClick}
>
</button>
<section>
    <h2>Velkommen til demoen!</h2>
    <p>Denne applikasjonen støtter DeviceMotionEvent på iPhone og iPad for å gi deg spesialeffekter. Du kan også bytte mellom lys og mørk modus for en tilpasset opplevelse. Håper du liker demoen!</p>
    <Button
        label="Begynn"
        mode="primary"
        size="small"
        transitionDuration={0}
        on:click={handleClick}
    />
</section>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
        outline: none;
        border: none;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }
    section {
        padding: 1.5rem 1rem;
        background-color: var(--body-background);
        color: var(--text-color);
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1001;
        max-width: 38rem;
        width: 80%;
    }

    h2 {
        margin-top: 0;
    }
    p {
        margin-bottom: 2rem;
    }
</style>