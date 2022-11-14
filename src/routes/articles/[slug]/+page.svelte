<script>
    export let data
    const { title, date, Content } = data
</script>

<article>
    <h1>{title}</h1>
    <p>Published: {date}</p>
    <Content slot="content"/>
</article>
