<script>
    import { onMount, afterUpdate } from 'svelte';

    export let start = 0.66;
    export let end = 0.9;
    export let index = 1;
    export let opacity = true;
    export let scale = true;
    export let translateY = true;
    export let reversed = false;
    export let minScale = 0;
    export let maxScale = 1;
    export let factor = 0;
    export let updateValuesTrigger = false; // external trigger to update values on change
    export let style;
    export let parallaxMovement = true;
    let viewport = 0;
    let div;
    let divHeight = 0;
    let divFromTop = 0;
    let windowScrollY = 0;
    let windowHeight = 0;
    let mounted = false;

    /* place to store values temporarily when parallaxMovement switched of in settings (reducedMotion) */
    let tmpOpacity;
    let tmpScale;
    let tmpTranslateY;

    function updateValues() {
        if (!parallaxMovement) {
            opacity = false;
            scale = false;
            translateY = false;
            return;
        } else {
            opacity = tmpOpacity;
            scale = tmpScale;
            translateY = tmpTranslateY;
        }
        if (!mounted) return;
        if (div === null) return;
        divHeight = div.getBoundingClientRect().height;
        divFromTop = windowScrollY + div.getBoundingClientRect().top;
        viewport = Math.max(0, (windowScrollY - (divFromTop - windowHeight)) / (divHeight + windowHeight) - 0.02 * Math.log(index + 1));
        factor = (viewport >= start && viewport <= end) 
            ? (viewport - start) / (end - start)
            : (viewport < start ? 0 : 1);
        if (reversed) {
            factor = 1 - factor;
        }
    }

    onMount(() => {
        tmpOpacity = opacity;
        tmpScale = scale;
        tmpTranslateY = translateY;
        mounted = true;
        //window.addEventListener('scroll', () => windowScrollY = window.scrollY);
        window.addEventListener('resize', updateValues);
        updateValues();

        if (localStorage.getItem('reducedMotion') === 'true') {
            parallaxMovement = false;
        } else {
            parallaxMovement = true;
        }
        document.addEventListener('reducedMotion', (e) => {
            parallaxMovement = !e.detail.reducedMotion;
        });
    });

    afterUpdate(updateValues);

    $: windowScrollY, mounted ? updateValues() : null;
    $: updateValuesTrigger, mounted ? updateValues() : null;

</script>

<svelte:window
    bind:innerHeight={windowHeight}
    bind:scrollY={windowScrollY}
/>

<span
    bind:this={div}
    style="
    opacity: {opacity ? 1 - factor : 1};
    transform: translateY(-{translateY ? factor*20 : 0}px) scale({scale ? minScale + (maxScale - minScale) * factor : 1});
    {style}
    "
    role="presentation"
>
    <slot />
</span>

<style>
    span {
        display: inline-block;
        will-change: transform, opacity;
        position: relative;
    }
</style>
