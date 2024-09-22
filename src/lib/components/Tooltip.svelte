<script>
    import { fade } from "svelte/transition";

    export let text = '';
    export let visible = true;
    export let bounce = false;
    export let background = 'var(--gray)';
    export let style;

</script>

{#if visible}
    <div class="tooltip-positioning-layer" style="--tooltip-background-color:{background}">
        <span {style} class:bounce transition:fade|global={{duration: 200}} class="tooltip" role="tooltip">{text}</span>
    </div>
{/if}

<style>
    .tooltip-positioning-layer {
        position: absolute;
        top: -120%;
        left: 50%;
        transform: translateX(-50%);
    }
    .tooltip {
        white-space: nowrap;
        background: var(--tooltip-background-color);
        color: var(--white);
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 0 0.6rem 0 rgba(0,0,0,0.08);
        border-radius: 0.5rem;
        display: block;
        padding: 0.5rem 0.5rem;
        line-height: 1;
        user-select: none;
    }
    /* arrow below */
    .tooltip:after {
        content: "";
        position: absolute;
        top: 90%;
        left: 50%;
        margin-left: -0.5rem;
        border-width: 0.5rem;
        border-style: solid;
        border-color: var(--tooltip-background-color) transparent transparent transparent;
    }
    /* bouncing up and down */
    .bounce {
        animation: bounce 1s infinite;
    }
    @keyframes bounce {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(0, -0.2rem);
        }
        100% {
            transform: translate(0, 0);
        }
    }
</style>