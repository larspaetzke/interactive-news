<script>
    import { fly, fade} from 'svelte/transition';
    import { quadOut } from 'svelte/easing';

    import ParallaxContainer from '$lib/components/ParallaxContainer.svelte';
    import Button from '$lib/components/Button.svelte';

    export let parallax = {x: 0, y: 0};
    export let parallaxMovement = false;
    export let parallaxOffset = 0;
    export let modalVisible = false;
    export let transition = true;
    export let transparency = 0.7;

    let transitionDurationIn = 2000;
    let transitionDelayIn = 1000;
    let transitionDurationOut = 300;
    let transitionDelayOut = 400;
    if (!transition) {
        transitionDurationIn = 0;
        transitionDelayIn = 0;
        transitionDurationOut = 0;
        transitionDelayOut = 0;
    }

</script>

<ParallaxContainer bind:parallax={parallax} {parallaxMovement} {parallaxOffset}>
    <div class="interaction-container-wrapper" style="--transparency: {transparency};">
        <div
            class="interaction-container"
            in:fly|global="{{ x: 300, duration: transitionDurationIn, delay: transitionDelayIn, easing: quadOut }}"
            out:fly|global={{ x: -400, duration: transitionDurationOut, delay: transitionDelayOut, opacity: 0, easing: quadOut}}
        >
            <header>
                <h2><slot name="heading" /></h2>
                {#if $$slots.modalcontent}<button aria-label="Information zur Grafik" class="info" on:click={() => modalVisible = true}>i</button>{/if}
            </header>
            <slot name="content" />
            {#if modalVisible}
                <div
                    transition:fade={{duration: 200}}
                    class="modal"
                    role="dialog"
                    aria-modal="true"
                    aria-describedby="modal-description"
                    aria-labelledby="modal-header"
                >
                    <div class="modal-content">
                        <header>
                            <h3 id="modal-header"><slot name="modalheader" /></h3>
                        </header>
                        <div id="modal-description">
                            <p><slot name="modalcontent" /></p>
                            <Button label="Skjønner" mode="secondary" transitionDuration={0} size="small"  on:click={() => modalVisible = false} />
                        </div>
                    </div>
                </div>
                <div
                    transition:fade={{duration: 200}}
                    class="modal-overlay" 
                    tabindex="0"
                    role="button"
                    on:click={() => modalVisible = false}
                    on:keydown={() => modalVisible = false}
                ></div>
            {/if}
        </div>
    </div>
</ParallaxContainer>


<style>
    .interaction-container-wrapper {
        margin-bottom: 2rem;
        user-select: none;
    }
    .interaction-container {
        position: relative;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem;
        border: 1rem solid var(--gray-ground);
        border-radius: 1rem;
        background: rgba(255, 255, 255,var(--transparency));
        backdrop-filter: blur(0.2rem);
    }
    @media (prefers-color-scheme: dark) {
        .interaction-container {
            background: rgba(32,35,39,var(--transparency));
        }
    }
    header {
        position: relative;
        padding: 0 1.4rem;
    }
    .info {
        position: absolute;
        top: 0.25rem;
        right: 0;
        border: 1px solid var(--gray-text);
        color: var(--gray-text);
        width: 1.2rem;
        height: 1.2rem;
        padding: 0.2rem;
        border-radius: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        background: transparent;
        transition-duration: 0.2s;
        flex-shrink: 0;
        flex-grow: 0;
        cursor: pointer;
    }
    .info:hover {
        color: var(--text-color);
        border-color: var(--text-color);
    }
    h2 {
        font-size: 1rem;
        font-weight: 550;
        line-height: 1.4;
        text-align: center;
        hyphens: auto;
        -webkit-hyphens: auto;
        margin: 0 0 1.5rem 0;
        color: var(--text-color);
    }
    /* modal */
    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--body-background);
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 0 0.4rem 0 rgba(0,0,0,0.09);
        z-index: 100;
        width: calc(100% - 1rem);
        max-width: 30rem;
    }
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(244, 244, 244, 0.9);
        backdrop-filter: blur(2px);
        z-index: 99;
    }
    .modal-content {
        position: relative;
        color: var(--text-color);
    }
    .modal-content header {
        display: flex;
        padding: 0;
    }
    .modal-content header h3 {
        font-size: 1rem;
        margin: 0 0 0.6rem 0;
    }
    .modal-content #modal-description {
        margin: 0;
    }
    .modal-content #modal-description p {
        color: var(--text-color);
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    @media (prefers-color-scheme: dark) {
        .modal-overlay {
            background: rgba(22, 22, 22, 0.97);
        }
    }
</style>