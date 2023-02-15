export const fetchMarkdownPosts = async () => {
  const allArticleFiles = import.meta.glob('/src/content/**/*.svx');

  return await Promise.all(
    Object.entries(allArticleFiles).map(async ([path, resolver]) => {
      const data = await resolver();
      const articleId = path.split('/').at(-1).replace('.svx', '');
      const directory = path.split('/').at(-2);
      const metadata = data['metadata'];

      console.debug(data);

      return {
        meta: metadata,
        id: articleId,
        directory: directory,
        content: data
      };
    })
  );
};
