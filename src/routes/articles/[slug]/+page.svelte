<script>
    export let data

    // Custom Layout import since we can't use named slots here.
    // See https://github.com/sveltejs/kit/issues/627
    // import Layout from '../+layout.svelte'
</script>

<article>
    <h1>{data.title}</h1>

    <!-- Use svelte:component instead of <Content/> to force reactivity if content changes (like changing articles) -->
    <svelte:component this={data.Content}/>

    <!-- <footer>{date}</footer>g -->
    <!-- footer should be in +layout.svelte, but we cannot use slots. See comment above -->
    <p></p>
    zuletzt bearbeitet am:
    <h5>{data.date}</h5>
</article>


