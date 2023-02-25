import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils';
import { parse, parseNode } from 'svelte-parse';
import { walk } from 'svast-utils';

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  /*
  let asts = allPosts.map((post) => {
    const Content = post.content.default;
    const source = `{@html ${Content.render().html}}`;
    //console.debug(source);

    const tree = parse({ value: source, generatePositions: false });
    //console.log(tree.children.expression.value);
    walk(tree.children[0], (node, parent) => {
      //console.log(node);
    });
    return {};
  });
  
  */

  return json(allPosts);
};
