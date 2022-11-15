<script>
    export let data
    const {title, date, Content} = data

    // Custom Layout import since we can't use named slots here.
    // See https://github.com/sveltejs/kit/issues/627
    // import Layout from '../+layout.svelte'
</script>

<article>
    <h1>{title}</h1>
    <Content />

    <!-- <footer>{date}</footer>g -->
    <!-- footer should be in +layout.svelte, but we cannot use slots. See comment above -->
    <p></p>
    zuletzt bearbeitet am:
    <h5>{date}</h5>
</article>


