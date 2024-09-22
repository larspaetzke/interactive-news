<script>
    import { onMount } from 'svelte';
    
    import Banner from "$lib/components/Banner.svelte";
    import Meta from "$lib/components/Meta.svelte";
    import Paragraph from "$lib/components/Paragraph.svelte";
    import Chart from "$lib/components/Chart.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import article from '$lib/data/article.json';

    let ScrollMagic;
    let scrollMagicController;

    onMount(async () => {
      // ScrollMagic dynamisch laden, nur auf der Client-Seite
      ScrollMagic = (await import('scrollmagic')).default;
      // Erstelle einen ScrollMagic-Controller
      scrollMagicController = new ScrollMagic.Controller();
    });
</script>

<Banner
    title={article.title}
    bind:ScrollMagic
    bind:scrollMagicController
/>
<Meta
    author={article.author}
    date={article.date}
    photographer={article.photographer}
/>
<main>
    {#each article.topParagraphs as paragraph}
        <Paragraph
            text={paragraph}
            bind:ScrollMagic
            bind:scrollMagicController
        />
    {/each}
    <Chart />
    {#each article.bottomParagraphs as paragraph}
        <Paragraph
            text={paragraph}
            bind:ScrollMagic
            bind:scrollMagicController
        />
    {/each}
</main>
<Footer />
<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        max-width: 40rem;
        width: 100%;
    }
</style>