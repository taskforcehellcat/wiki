import type { Hit, Breadcrumb } from './.d.ts';
import type { Article, Directory } from '../../app.js';

export class Search {
  articles: Array<Article>;
  directoryIdsToDisplay: Map<string, string>;

  constructor(articles: Array<Article>, menu: Array<Directory>) {
    this.articles = articles;
    this.directoryIdsToDisplay = new Map(
      menu.map((e) => {
        return [e.id, e.config.title];
      })
    );
  }

  query(query: string) {
    /*
     * Searches for the query in the index.
     * May return: Array<Hit>
     * May throw TODO document exception cases here
     */

    if (query.length == 0) {
      throw Error('Cannot search for empty string.');
    }

    query = query.toLowerCase().trim();

    // will hold all the hits to be returned
    let hits: Array<Hit> = [];

    this.articles.forEach((article) => {
      const html = article['html'];
      const htmlLower = html.toLowerCase();

      // check if the article name itself is a match
      // prefer the short title if it is defined and matches
      const titleShort = article.meta.title_short
        ? article.meta.title_short
        : '';
      const title = article.meta.title;

      if (titleShort.toLocaleLowerCase().includes(query)) {
        const crumbs: Array<Breadcrumb> = [
          {
            display: this.directoryIdsToDisplay.get(article.directory) ?? '',
            link: '/'
          },
          { display: titleShort, link: `/${article.directory}/${article.id}` }
        ];

        hits.push({
          type: 'article',
          breadcrumbs: crumbs,
          text: titleShort,
          occurrence: 0
        });
      } else if (title.toLocaleLowerCase().includes(query)) {
        const crumbs: Array<Breadcrumb> = [
          {
            display: this.directoryIdsToDisplay.get(article.directory) ?? '',
            link: '/'
          },
          { display: title, link: `/${article.directory}/${article.id}` }
        ];

        hits.push({
          type: 'article',
          breadcrumbs: crumbs,
          text: title,
          occurrence: 0
        });
      }

      // now for heading matches...

      /**
       * ok so about those regexes
       * i dont really know why they work
       * i am afraid to touch them
       * i tried to clean it up but i just broke everything
       * please dont make me rework this
       * ´.+´ might look sloppy and it is but it works for now
       */

      // get all the headings with their ids
      const headingRegex = /<h\d ?(id=".+"|class=".+")?>.+<\/h\d>/g;
      const headingsRaw = html.match(headingRegex) ?? [];

      const headings: { heading: string; id: string }[] = headingsRaw.map(
        (str) => {
          let title = str.replaceAll(/<h\d id=".+">/g, '');
          title = title.replaceAll(/<\/h\d>/g, '');

          let id = (str.match(/id="[^"]+"/g) ?? [])[0] ?? '';
          id = id.replace('id=', '');
          id = id.replaceAll('"', '');
          return { heading: title, id: id };
        }
      );

      // find matching ones
      for (const { heading, id } of headings) {
        if (heading.toLocaleLowerCase().includes(query)) {
          const crumbs: Array<Breadcrumb> = [
            {
              display: this.directoryIdsToDisplay.get(article.directory) ?? '',
              link: '/'
            },
            { display: title, link: `/${article.directory}/${article.id}` },
            {
              display: heading,
              link: `/${article.directory}/${article.id}#${id}`
            }
          ];

          hits.push({
            type: 'heading',
            breadcrumbs: crumbs,
            text: title,
            occurrence: 0
          });
        }
      }

      // now for text matches...
      // TODO implement.

      // this holds the index of the last found occurrence
      let cursor = 0;
      let occurringIndices: number[] = [];

      while (cursor != -1) {
        cursor = htmlLower.indexOf(query, cursor);
        if (cursor != -1) {
          occurringIndices.push(cursor);
          cursor = cursor + query.length;
        }
      }
    });

    return hits;
  }
}
