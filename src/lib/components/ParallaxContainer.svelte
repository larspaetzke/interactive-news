<script>
    import { onMount } from "svelte";

    export let parallaxMovement = true;
    export let parallaxOffset = 0;
    export let style;

    let parallaxMovementEnabled = parallaxMovement;

    $: parallaxTransform = parallaxMovementEnabled ? 'transform: translate3d(' + parallax.x * -(5 + parallaxOffset) + 'px, ' + parallax.y * -(5 + parallaxOffset) + 'px, 0);' : '';

    /* Parallax for components */
    let isTouch = false;
    let windowWidth = 0;
    let windowHeight = 0;
    let parallax = {
        source: null,
        x: 0,
        y: 0,
    }
    function updateParallaxValues(moveX, moveY) {
        if (isTouch) return;
        parallax.source = "mousemove";
        let moveXFromCenter = moveX - (windowWidth / 2);
        let moveYFromCenter = moveY - (windowHeight / 2);
        let moveXFromCenterPercent = moveXFromCenter / (windowWidth / 2);
        let moveYFromCenterPercent = moveYFromCenter / (windowHeight / 2);
        parallax.x = moveXFromCenterPercent;
        parallax.y = moveYFromCenterPercent;
    }

    function touchHandler(event) {
        if (event.target.localName.includes("swiper")) return; // prevent touch event of swiper
        isTouch = true;
    }

    /* parallax by device motion */
    function enableDeviceMotionTracking() {
        if (window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function') {
            try {
                window.DeviceMotionEvent.requestPermission().then(response => {
                    if (response == 'granted') {
                        window.addEventListener('deviceorientation', (event) => {
                            parallax.source = "deviceorientation";
                            let beta = event.beta; // -180 - 180
                            let gamma = event.gamma; // -90 - 90
                            let mappedBeta = mapNumberRange(beta, -180, 180, -100, 100) / 100;
                            let mappedGamma = mapNumberRange(gamma, -90, 90, -100, 100) / 100;

                            if (tmpMappedBeta !== undefined) {
                                const threshold = 0.2;
                                const step = 0.04; // Adjust this value for desired smoothing effect
                                
                                mappedBeta = smoothSensorData(mappedBeta, tmpMappedBeta, threshold, step);
                                mappedGamma = smoothSensorData(mappedGamma, tmpMappedGamma, threshold, step);
                            }

                            tmpMappedBeta = mappedBeta;
                            tmpMappedGamma = mappedGamma;
                            
                            if (window.innerHeight > window.innerWidth) {
                                parallax.x = mappedGamma * 3;
                                parallax.y = mappedBeta * 7.5;
                            } else {
                                parallax.x = mappedBeta * 6;
                                parallax.y = mappedGamma * 3;
                            }
                    });
                    } else {
                        console.log("Device motion permission denied");
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    let tmpMappedBeta = undefined;
    let tmpMappedGamma = undefined;

    function mapNumberRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function smoothSensorData(newValue, oldValue, threshold, step) {
        if (oldValue === undefined || Math.abs(newValue - oldValue) <= threshold) {
            return newValue;
        } else {
            if (newValue > oldValue) {
                return oldValue + step;
            } else {
                return oldValue - step;
            }
        }
    }
    onMount(() => {
        if (localStorage.getItem('reducedMotion') === 'true') {
            parallaxMovementEnabled = false;
        } else {
            if (parallaxMovement) {
                parallaxMovementEnabled = true;
            } else {
                parallaxMovementEnabled = false;
            }
        }
        document.addEventListener('reducedMotion', (e) => {
            if (parallaxMovement) {
                parallaxMovementEnabled = !e.detail.reducedMotion;
            } else {
                parallaxMovementEnabled = false;
            }
        });
        enableDeviceMotionTracking();
    });

</script>

<svelte:window
    bind:innerHeight={windowHeight}
    bind:innerWidth={windowWidth}
    on:mousemove={e => updateParallaxValues(e.clientX, e.clientY)}
    on:touchstart={touchHandler}
/>

<div style="{style ? style : ""} {parallaxTransform}">
    <slot />
</div>

<style>
    div {
        transition: 0.05s linear;
        will-change: transform;
        width: 100%;
    }
</style>