export async function load({params}) {
    const slug = params.slug

    // TODO: 404 if import fails
    const post = await import(
        /* @vite-ignore */
        `./${slug}.svx`
        )
    const {title, date, breadcrumbs} = post.metadata
    const Content = post.default

    return {
        Content,
        title,
        date,
        breadcrumbs,
    }
}
