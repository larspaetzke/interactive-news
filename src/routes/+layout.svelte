<script>
    import 'normalize.css/normalize.css';
    import '../app.css';
</script>

<article>
    <slot />
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-x: hidden;
        width: 100%;
    }
</style>