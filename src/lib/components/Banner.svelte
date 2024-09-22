<script>
    import ParallaxContainer from "$lib/components/ParallaxContainer.svelte";
    import Runes from "$lib/components/Runes.svelte";
    export let title = "";
    export let ScrollMagic;
    export let scrollMagicController;

    let windowHeight = 0;
    let windowScrollY = 0;

</script>

<svelte:window
    bind:innerHeight={windowHeight}
    bind:scrollY={windowScrollY}
/>

<header>
    <div class="header-content">
        <ParallaxContainer
            style="position:absolute; top: 0; left: 0; width: 100%; height: 100%;"
            parallaxOffset={-10.5}
        >
            <figure
                class="layer1"
                style="transform: translateY({windowScrollY/10}px)
                scale({windowScrollY/4000 + 1})
                ;"
            ></figure>
        </ParallaxContainer>
        <ParallaxContainer
            style="position:absolute; bottom: 32%; left: 0; width: 100%;"
        >
            <h1>
                {#each title.split(' ') as word, wordIndex (word+wordIndex)}
                <Runes
                    {word}
                    bind:ScrollMagic
                    bind:scrollMagicController
                    triggerHook={0.45}
                    minOpacity={1}
                />
                    {#if wordIndex < title.split(' ').length - 1}
                        <span></span>
                    {/if}
                {/each}
            </h1>
        </ParallaxContainer>

        <ParallaxContainer
            style="position:absolute; top: 0; left: 0; width: 100%; height: 100%;"
            parallaxOffset={5.5}
        >
            <figure
                class="layer2"
                style="transform: translateY({windowScrollY/220}px)
                scale({windowScrollY/6000 + 1})
                ;"
            ></figure>
        </ParallaxContainer>
    </div>
</header>

<style>
    header {
        width: 100%;
        min-height: calc(100vh - 1rem);
        background-image: url('/img/bg.jpg');
        background-size: cover;
        position: relative;
        overflow: hidden;
        background-position: 10% center;
    }
    .header-content {
        transform: scale(1.2);
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
    h1 {
        max-width: 40rem;
        color: var(--white);
        font-size: clamp(1.5rem, 5vw, 2rem);
        padding: 1rem;
        text-align: center;
        width: calc(100% - 2rem);
        margin: auto;
    }
    header figure {
        margin: 0;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        transform-origin: bottom center;
        will-change: transform;
        background-position: 10% center;
    }
    .layer1 {
        background-image: url('/img/bglayer1.png');
    }
    .layer2 {
        background-image: url('/img/bglayer2.png');
    }
</style>