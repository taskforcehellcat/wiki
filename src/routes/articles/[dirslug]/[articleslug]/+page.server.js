/*
import {error} from "@sveltejs/kit";
import {parse, parseNode} from 'svelte-parse';
import {walk} from 'svast-utils';

export async function load({params}) {
    const slug = params.slug
    // const pathname = url.pathname
    let post;

    try {
        post = await import(
            `../../../content/${slug}.svx`
            )
    } catch (e) {
        throw error(404, 'Not found');
    }

    const Content = post.default
    const source = `{@html ${Content.render().html}}`;

    const tree = parse({value: source, generatePositions: true});
    // console.log(tree.children[0])
    walk(tree.children[0], (node, parent) => {
        console.log(node)
    })

    return {
        anchorMenu: []
    }
}
*/
