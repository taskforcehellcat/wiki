import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const articleslug = params['articleslug'];
  const dirslug = params['dirslug'];

  let post;

  try {
    post = await import(`../../../../content/${dirslug}/${articleslug}.svx`);
  } catch (e) {
    throw error(404, 'Not found');
  }

  const { title, description, date, nav_index } = post.metadata;
  const Content = post.default;

  return {
    Content,
    title,
    dirslug,
    articleslug,
    date,
    description,
    nav_index
  };
}
