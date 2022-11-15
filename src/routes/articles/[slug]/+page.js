import {error} from "@sveltejs/kit";

export async function load({params}) {
    const slug = params.slug
    let post;

    try {
        post = await import(
            `./content/${slug}.svx`
            )
    } catch (e) {
        throw error(404, 'Not found');
    }

    const {title, date, breadcrumbs} = post.metadata
    const Content = post.default

    return {
        Content,
        title,
        date,
        breadcrumbs,
    }
}
