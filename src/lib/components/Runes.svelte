<script>  
    export let word = 'HELLO'; // Das Wort, das die Komponente anzeigt
    export let delay = 0; // Verzögerung für die Animation
    export let triggerHook = 0.9; // Auslöser bei 20% vom unteren Bildschirmrand
    export let scrollMagicController;
    export let ScrollMagic;
    export let minOpacity = 0.5;
    export let style;
    
    let runeVisible = true; // Startet mit Rune sichtbar
    let runeElement = null;
  
    // Mapping von lateinischen Buchstaben zu älteren Futhark-Runen
    const runeMapping = {
        'Å': 'ᚨ',
        'A': 'ᚨ',
        'B': 'ᛒ',
        'C': 'ᚲ', 
        'D': 'ᛞ',
        'E': 'ᛖ',
        'F': 'ᚠ',
        'G': 'ᚷ',
        'H': 'ᚺ',
        'I': 'ᛁ',
        'J': 'ᛃ',
        'K': 'ᚲ',
        'L': 'ᛚ',
        'M': 'ᛗ',
        'N': 'ᚾ',
        'O': 'ᛟ',
        'P': 'ᛈ',
        'Q': 'ᛩ', 
        'R': 'ᚱ',
        'S': 'ᛋ',
        'T': 'ᛏ',
        'U': 'ᚢ',
        'V': 'ᚡ', 
        'W': 'ᚹ',
        'X': 'ᛪ', 
        'Y': 'ᚣ',
        'Z': 'ᛉ',
        'Æ': 'ᛅ',
        'Ø': 'ᛟ',
        'Å': 'ᚨ'
    };

    // Erstellen der Runen-Version des übergebenen Wortes
    $: runicWord = word.split('').map(char => runeMapping[char.toUpperCase()] || char).join('');
  
    $: ScrollMagic, ScrollMagic ? initScrollMagic() : null;

    function initScrollMagic() {
        const scene = new ScrollMagic.Scene({
            triggerElement: runeElement,  // Das Element, das den Trigger auslöst
            triggerHook: triggerHook,             // Auslöser bei 20% vom unteren Bildschirmrand
            reverse: true                 // Erlaubt das Zurückschalten der Animation beim Scrollen nach oben
        })
        .on('enter', () => {
          runeVisible = false;        // Wechsel zu Buchstabe, wenn der Auslöser aktiviert wird
        })
        .on('leave', () => {
          runeVisible = true;         // Zurück zur Rune, wenn der Auslöser verlassen wird
        })
        .addTo(scrollMagicController);  
    }
</script>

<span
    bind:this={runeElement}
    class:runeVisible
    class="word {runicWord ? 'hasRune' : ''}"
    {style}
>
    <!-- Lateinische Schrift -->
    <span
        class="latin"
        style="transition-delay: {delay}s;"
    >{word}</span>

    <!-- Runische Schrift -->
    {#if runicWord}
        <span
            aria-hidden="true"
            class="runic"
            style="transition-delay: {delay}s; opacity: {runeVisible ? minOpacity : 0};"
        >{runicWord}</span>
    {/if}
</span>

<style>
    span {
        display: inline-block;
        font-weight: 380;
        transition: 0.2s ease-in-out;
        letter-spacing: 1px;
    }
    .word {
        position: relative;
    }
    .runic {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(0%) translateY(1rem);
        user-select: none;
        pointer-events: none;
        will-change: transform, opacity;
    }
    .latin {
        will-change: transform, opacity;
    }
    .runeVisible .runic {
        opacity: 0.5;
        transform: translateX(0%) translateY(0);
    }
    .hasRune.runeVisible .latin {
        opacity: 0;
        transform: translateY(-1rem);
    }

    @keyframes blurIn {
        0% {
            filter: blur(0.1rem);
        }
        100% {
            filter: blur(0);
        }
    }
    @keyframes blurOut {
        0% {
            filter: blur(0);
        }
        100% {
            filter: blur(0.1rem);
        }
    } 
    .word.runeVisible {
        animation: blurIn 0.2s;
    }
    .word:not(.runeVisible) {
        animation: blurOut 0.2s;
    }
</style>
