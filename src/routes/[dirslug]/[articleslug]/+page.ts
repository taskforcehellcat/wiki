import { error } from '@sveltejs/kit';
import type { Article, ArticleFile } from '../../../app';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const articleslug = params['articleslug'];
  const dirslug = params['dirslug'];

  let post: ArticleFile;

  try {
    post = await import(`../../../content/${dirslug}/${articleslug}.svx`);
  } catch (e) {
    throw error(
      404,
      `Not found: ../../../content/${dirslug}/${articleslug}.svx`
    );
  }

  const { title, title_short, date, nav_index }: Article['meta'] =
    post.metadata;
  const Content = post.default;

  return {
    Content,
    title,
    dirslug,
    articleslug,
    date,
    title_short,
    nav_index
  };
}
