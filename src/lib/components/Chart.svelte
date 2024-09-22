<script>
    import { onMount, onDestroy } from 'svelte';
	import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";

    import Button from "$lib/components/Button.svelte";
	import Tooltip from '$lib/components/Tooltip.svelte';
	import InteractionContainer from '$lib/components/InteractionContainer.svelte';

    export let title = "Holdninger til KI";
    export let year = 2021;
    export let minYear = 2021;
    export let maxYear = 2028;
    export let parallax = {x: 0, y: 0};
    export let parallaxMovement = false;
    export let parallaxOffset = 0;
    let dir = 1; // 1 = up, -1 = down
    let callTOActionTimer = null;
    let callToAction = false;

    $: bars = [
        {
            label: 'Bruker ChatGPT',
            background: 'var(--primary)',
            color: '#fff',
            percentage: [
                {
                    year: 2021,
                    value: 1
                },
                {
                    year: 2022,
                    value: 10
                },
                {
                    year: 2023,
                    value: 15
                },
                {
                    year: 2024,
                    value: 30
                },
                {
                    year: 2025,
                    value: 40
                },
                {
                    year: 2026,
                    value: 50
                },
                {
                    year: 2027,
                    value: 60
                },
                {
                    year: 2028,
                    value: 70
                }
            ],
            logoSvg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2406 2406"><path id="a" d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z" fill="var(--text-color)"/><use xlink:href="#a" transform="rotate(60 1203 1203)"/><use xlink:href="#a" transform="rotate(120 1203 1203)"/><use xlink:href="#a" transform="rotate(180 1203 1203)"/><use xlink:href="#a" transform="rotate(240 1203 1203)"/><use xlink:href="#a" transform="rotate(300 1203 1203)"/></svg>'
        },
        {
            label: 'Forstår AI',
            background: '#00B7B1',
            color: '#fff',
            percentage: [
                {
                    year: 2021,
                    value: 10
                },
                {
                    year: 2022,
                    value: 20
                },
                {
                    year: 2023,
                    value: 24
                },
                {
                    year: 2024,
                    value: 25
                },
                {
                    year: 2025,
                    value: 26
                },
                {
                    year: 2026,
                    value: 28
                },
                {
                    year: 2027,
                    value: 22
                },
                {
                    year: 2028,
                    value: 26
                }
            ],
        },
        {
            label: 'Skeptisk',
            background: '#F0C30F',
            color: '#fff',
            percentage: [
                {
                    year: 2021,
                    value: 20
                },
                {
                    year: 2022,
                    value: 30
                },
                {
                    year: 2023,
                    value: 40
                },
                {
                    year: 2024,
                    value: 40
                },
                {
                    year: 2025,
                    value: 30
                },
                {
                    year: 2026,
                    value: 20
                },
                {
                    year: 2027,
                    value: 10
                },
                {
                    year: 2028,
                    value: 10
                }
            ],
        }
    ]
    $: barsSortedBypercentage = bars.sort((b, a) => a.percentage[year - minYear].value - b.percentage[year - minYear].value);

    $: highestpercentageOfVisiblebars = Math.max(...barsSortedBypercentage.map(bar => bar.percentage[year - minYear].value));

    /* timer needed in order to trigger update of bars binding */
    $: guiUpdateTimer = setTimeout(() => {
        clearTimeout(guiUpdateTimer);
        guiUpdateTimer = null;
        bars = bars;
    }, 200);

    function goToNextYear() {
        callTOActionTimer = clearTimeout(callTOActionTimer);
        callToAction = false;
        if (year < maxYear) {
            dir = 1;
            year++;
        }
    }
    function goToPrevYear() {
        if (year > minYear) {
            dir = -1;
            year--;
        }
    }
    
    let bars = []; // array of bar elements binded @markup
    $: bars = bars;

    function setCallToActionTimer() {
        callTOActionTimer = setTimeout(() => {
            callToAction = true;
        }, 3000);
    }

    onMount(() => {
        setCallToActionTimer();
    });

    onDestroy(() => {
        clearTimeout(guiUpdateTimer);
        clearTimeout(callTOActionTimer);
        guiUpdateTimer = null;
    });
</script>

<InteractionContainer
    {parallax}
    {parallaxMovement}
    {parallaxOffset}
    transparency={0.7}
>
    <span slot="heading">{title} i {year}</span>
    <span slot="content">
        <ul class="barchart">
            {#each barsSortedBypercentage as company (company.label)}
                <li animate:flip={{ duration: 300 }} class="bar-wrapper">
                    <div bind:this={bars[company.label]} class="bar" style="width: {company.percentage[year - minYear].value / highestpercentageOfVisiblebars * 100}%; background-color: {company.background};">
                        {#if bars[company.label] && bars[company.label].clientWidth > 100}
                            <p transition:fade={{duration: 100, delay: 0}} class="label" style="color: {company.color};">{company.label}</p>
                        {/if}
                    </div>
                    {#if company.logoSvg}
                        {@html company.logoSvg}
                    {/if}
                </li>
            {/each}
        </ul>
        <nav>
            <div>
                {#if year > minYear}
                    <Button label="&#10094; {year-1}" mode="tertiary" size="small" on:click={goToPrevYear} />
                {/if}
            </div>
            <div>
                <Tooltip bounce={true} text="Klikk meg" visible={callToAction} />
                {#if year < maxYear}
                    <Button label="{year+1} &#10095;" mode="secondary" size="small" on:click={goToNextYear} />
                {/if}
            </div>
        </nav>
    </span>
    <span slot="modalheader">Viktig informasjon</span>
    <span slot="modalcontent">
        Tallene er fiktive og brukes kun til demonstrasjon.
    </span>
</InteractionContainer>

<style>
    ul.barchart {
        font-weight: 550;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 0 1.5rem 0;
        list-style: none;
        padding: 0 2.5rem 0 0;
        color: #000;
    }
    li.bar-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0.1rem 4rem 0.1rem 0;
        width: 100%;
        padding: 0;
    }
    .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        hyphens: none;
        white-space: nowrap;
        line-height: 1.2;
        font-size: 0.8rem;
    }
    .bar {
        transition: width 1s ease-in-out;
        height: 2rem;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    p {
        margin: 0;
    }
    :global(.barchart .bar-wrapper svg) {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0 0.6rem;
        flex-shrink: 0;
    }
    @media (prefers-color-scheme: dark) {
        :global(.barchart .bar-wrapper svg, .barchart .bar-wrapper svg path) {
            fill: #EEE!important;
        }
    }
    nav {
        display: flex;
        justify-content: space-between;
    }
    nav > div {
        position: relative;
    }
</style>