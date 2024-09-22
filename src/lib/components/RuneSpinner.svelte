<script>
    import { onMount } from 'svelte';
    //let ScrollMagic; // ScrollMagic erst auf dem Client laden
  
    export let letter = 'A'; // Der lateinische Buchstabe, den die Komponente zeigt
    export let delay = 0; // Verzögerung für die Animation
    export let triggerHook = 0.8; // Auslöser bei 20% vom unteren Bildschirmrand
    export let scrollMagicController;
    export let ScrollMagic;
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
    $: ScrollMagic, ScrollMagic ? initScrollMagic() : null;

    function initScrollMagic() {
        console.log('initScrollMagic');
        // Szene erstellen, die die Sichtbarkeit der Rune steuert
        const scene = new ScrollMagic.Scene({
            triggerElement: runeElement, // Das Element, das den Trigger auslöst
            triggerHook: triggerHook, // Auslöser bei 20% vom unteren Bildschirmrand
            reverse: true // Erlaubt das Zurückschalten der Animation beim Scrollen nach oben
        })
        .on('enter', () => {
            runeVisible = false; // Wechsel zu Buchstabe, wenn der Auslöser aktiviert wird
        })
        .on('leave', () => {
            runeVisible = true; // Zurück zur Rune, wenn der Auslöser verlassen wird
        })
        .addTo(scrollMagicController);  
    }
  </script>


<span
    bind:this={runeElement}
    class:runeVisible
    class="letter {runeMapping[letter.toUpperCase()] ? "hasRune" : ""} {letter === " " ? "space" : ""}"
    {style}
>
    <span
        class="latin"
        style="transition-delay: {delay}s;"
    >{letter}</span>
    {#if runeMapping[letter.toUpperCase()]}
        <span
            class="runic"
            style="transition-delay: {delay}s;"
        >{runeMapping[letter.toUpperCase()]}</span>
    {/if}
</span>

<style>
    span {
        display: inline-block;
        font-weight: 380;
        transition: 0.2s ease-in-out;
        letter-spacing: 1px;
    }
    .space {
        display: inline;
    }
    .letter {
        position: relative;
    }
    .runic {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(1rem);
        user-select: none;
        pointer-events: none;
    }
    .runeVisible .runic {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    .hasRune.runeVisible .latin {
        opacity: 0;
        transform: translateY(-1rem);
    }
</style>