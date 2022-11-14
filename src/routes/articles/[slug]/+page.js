export async function load({ params }){
    const slug = params.slug
    const post = await import(`./${slug}.svx`)
    const { title, date } = post.metadata
    const Content = post.default

    return {
        Content,
        title,
        date,
    }
}
