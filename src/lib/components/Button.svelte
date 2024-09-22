<script>
    import ParallaxContainer from '$lib/components/ParallaxContainer.svelte';

    import { fade } from 'svelte/transition';
    import { quadOut, quadIn } from 'svelte/easing';

    import { onDestroy } from 'svelte';

    import { createEventDispatcher } from 'svelte';

    export let parallax = {x: 0, y: 0};
    export let parallaxMovement = false;
    export let parallaxOffset = 0;
    export let mode = 'primary';
    export let size = 'medium';
    export let icon = '';
    export let label = '';
    export let disabled = false;
    export let delayAddition = 0;
    export let delay = 0;
    export let transitionDuration = 400;
    export let ariaLabel;
    export let white = false;
    export let style;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click');
    }

    function handleFocus() {
        dispatch('focus');
    }

    function handleBlur() {
        dispatch('blur');
    }

    function handleMouseenter() {
        dispatch('mouseenter');
    }

    function handleMouseleave() {
        dispatch('mouseleave');
    }

</script>

<ParallaxContainer bind:parallax={parallax} {parallaxMovement} {parallaxOffset}>
    {#if label && label !== ''}
        <button
            class:primary={mode === 'primary'}
            class:secondary={mode === 'secondary'}
            class:tertiary={mode === 'tertiary'}
            class:quaternary={mode === 'quaternary'}
            class:small={size === 'small'}
            class:medium={size === 'medium'}
            class:large={size === 'large'}
            class:round={size === 'round'}
            class:white={white}
            class:hasIcon={icon !== '' ? true : false}
            on:click={handleClick}
            on:focus={handleFocus}
            on:blur={handleBlur}
            on:mouseenter={handleMouseenter}
            on:mouseleave={handleMouseleave}
            {disabled}
            {style}
            aria-label={ariaLabel ? ariaLabel : label}
            in:fade|global={{duration: transitionDuration*1.5, delay: delay + delayAddition, easing: quadIn}}
            out:fade|global={{duration: transitionDuration, delay: delayAddition, easing: quadOut}}
        >
            {label}
        </button>
    {/if}
</ParallaxContainer>


<style>
    button {
        border: 0.11rem solid;
        font-size: 1rem;
        line-height: 1.2;
        display: flex;
        align-items: center;
        transition: var(--transition-duration) var(--reveal-timing-function); /* Optional: Fügt eine sanfte Übergangsanimation hinzu */
        /* prevnt double tap zoom */
        touch-action: manipulation;
        will-change: auto;
        user-select: none;
        cursor: pointer;
    }
    button::-webkit-inner-spin-button,
    button::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    button::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
    button:focus {
        outline: 0.14rem solid var(--focus-outline);
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    /* button modes */
    .primary {
        background-color: var(--primary);
        border-color: var(--primary);
        color: var(--white);
    }
    .secondary {
        background-color: var(--black);
        border-color: var(--black);
        color: var(--white);
    }
    .tertiary {
        background-color: transparent;
        border-color: var(--text-color);
        color: var(--text-color);
    }
    .quaternary {
        background-color: transparent;
        border-color: var(--gray-text);
        color: var(--gray-text);
    }
    .tertiary:not(:disabled):hover {
        background-color: var(--gray-light);
        border-color: var(--text-color);
    }
    /* button sizes */
    .small {
        font-size: 0.87rem;
        padding: 0.4rem 1rem;
        border-radius: 0.5rem;
        gap: 0.2rem;
    }
    .medium {
        font-size: 1.2rem;
        padding: 0.66rem 2.2rem;
        border-radius: 1rem;
        gap: 0.5rem;
    }
    .large {
        line-height: 1;
        font-size: 1.6rem;
        padding: 0.9rem 4rem;
        border-radius: 1.2rem;
        gap: 0.5rem;
    }
    .round {
        line-height: 1;
        width: 2rem;
        height: 2rem;
        border-radius: 3rem;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        flex-grow: 0;
        flex-shrink: 0;
    }
    /* white */
    .white {
        background-color: transparent!important;
        border-color: #fff!important;
        color: #fff!important;
    }
    @keyframes fallingShield {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        20% {
            transform: translateY(0) rotate(108deg);
        }
        30% {
            transform: translateY(0) rotate(76deg);
        }
        39% {
            transform: translateY(0) rotate(102deg);
        }
        47% {
            transform: translateY(0) rotate(80deg);
        }
        56% {
            transform: translateY(0) rotate(100deg);
        }
        62% {
            transform: translateY(0) rotate(84deg);
        }
        70% {
            transform: translateY(0) rotate(96deg);
        }
        78% {
            transform: translateY(0) rotate(88deg);
        }
        86% {
            transform: translateY(0) rotate(92deg);
        }
        90% {
            opacity: 1;
            transform: translateY(400px) rotate(110deg);
        }
        100% {
            opacity: 0;
            visibility: hidden;
            transform: translateY(900px) rotate(120deg);
        }
    }
</style>