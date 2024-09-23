<script>
    export let checked = false; // Boolean-Variable
    export let label = ""; // Optionaler Text für das Label
</script>

<label class="toggle">
    <input type="checkbox" bind:checked />
    <span class="slider"></span>
    {#if label}
        <span class="toggle-label">{label}</span>
    {/if}
</label>

<style>
/* Container für den Toggle */
.toggle {
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
    margin-right: 1rem;
}

/* Verstecke die eigentliche Checkbox */
input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
}

/* Slider-Stil für den Toggle */
.slider {
    position: relative;
    width: 45px;
    height: 25px;
    background-color: var(--inactive-bg, #ccc); /* Inaktiver Zustand */
    border-radius: 25px;
    transition: background-color 0.3s;
}

/* Kreis für den Schieberegler */
.slider::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2.5px;
    left: 3px;
    transition: transform 0.3s;
}

/* Wenn die Checkbox aktiv ist (also `checked`), ändere die Farben */
input:checked + .slider {
    background-color: var(--active-bg, #1F4D3A); /* Aktiver Zustand (helles Grün für Darkmode) */
}

/* Verschiebe den Kreis bei aktivem Zustand */
input:checked + .slider::before {
    transform: translateX(20px);
}

/* Optionaler Text neben dem Toggle */
.toggle-label {
    margin-left: 10px;
    color: var(--text-color);
    font-size: 14px;
}
</style>
