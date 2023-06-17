import type { Article, ArticleFile } from '../../app';

export const fetchMarkdownPosts = async () => {
  const allArticleFiles = import.meta.glob<ArticleFile>(
    '/src/content/**/*.svx'
  );
  // gets an array of {'path': promise of file} (i believe)

  return await Promise.all(
    Object.entries(allArticleFiles).map(async ([path, resolver]) => {
      const data = await resolver();
      const articleId = path.split('/').at(-1)?.replace('.svx', '') ?? '';
      const directory = path.split('/').at(-2) ?? '';
      const metadata = data['metadata'];

      if (articleId === '' || directory === '') {
        console.warn(`Something went wrong processing an article: \n${data}`);
      }

      /* While testing other stuff with this configuration, it seemed like
      rendering all the html with every fetch like so didn't have a noticable
      impact on performance.
      
      TODO: measure */

      let plainHTML = '';
      try {
        plainHTML = data.default['render']()['html'];
      } catch (TypeError) {
        /* TODO: proper handling */
        console.error('Something went wrong rendering the html');
        // NOTE: i've never seen this occurring...
      }

      return {
        meta: metadata,
        id: articleId,
        directory: directory,
        html: plainHTML
      } satisfies Article;
    })
  );
};
