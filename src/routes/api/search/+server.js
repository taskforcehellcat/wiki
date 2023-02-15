import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils';
import { parse, parseNode } from 'svelte-parse';
import { walk } from 'svast-utils';

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  allPosts.forEach((post) => {
    const Content = post.content.default;
    const source = `{@html ${Content.render().html}}`;
    console.debug(source);

    const tree = parse({ value: source, generatePositions: true });
    // console.log(tree.children[0])
    // walk(tree.children[0], (node, parent) => {
    //   console.log(node);
    // });
  });

  return json(allPosts);
};
