import { searchResults } from '$lib/search/stores';

// This information would be already available by the config property of
// a menu entry object, but i want to get a prototype going therefore
// i'll implement it this way for the time being and mark it TODO.

const dirNameToDisplayName = new Map([
  ['aufklaerungstruppe', 'Aufklärungstruppe'],
  ['ausbildung', 'Ausbildung'],
  ['fliegertruppe', 'Fliegertruppe'],
  ['fuhrpark', 'Fuhrpark'],
  ['infanterie', 'Infanterie'],
  ['logistiktruppe', 'Logistiktruppe'],
  ['panzertruppen', 'Panzertruppen'],
  ['pioniertruppe', 'Pioniertruppe'],
  ['sanitaetsdienst', 'Sanitätsdienst'],
  ['ueber-uns', 'Über uns']
]);

export class Hit {
  // whether this hit is a page itself, a heading on this page
  // or in a text on this page
  type: 'article' | 'heading' | 'text';
  // basically the path to the hit(s)
  breadcrumbs: Array<{ display: string; link: string }>;
  // the text in witch the index occurred or the heading or article name
  text: string;
  // the index at which the hit occurs in the text
  occurrence: number;

  constructor(type, crumbs, text, occ) {
    this.type = type;
    this.breadcrumbs = crumbs;
    this.text = text;
    this.occurrence = occ;
  }
}

export class Search {
  articles: {
    meta: {
      title: string;
      title_short: string;
      date: string;
      nav_index: number;
    };
    id: string;
    directory: string;
    html: string;
  }[];

  constructor(articles) {
    this.articles = articles;
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
      const titleShort = article.meta.title_short ? article.meta.title_short : '';
      const title = article.meta.title;

      if (titleShort.toLocaleLowerCase().includes(query)) {
        const crumbs = [
          { display: dirNameToDisplayName.get(article.directory), link: '/' },
          { display: titleShort, link: `/articles/${article.directory}/${article.id}` }
        ];
        hits.push(new Hit('article', crumbs, titleShort, 0));
      } else if (title.toLocaleLowerCase().includes(query)) {
        const crumbs = [
          { display: dirNameToDisplayName.get(article.directory), link: '/' },
          { display: title, link: `/articles/${article.directory}/${article.id}` }
        ];
        hits.push(new Hit('article', crumbs, title, 0));
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

      const headings: { heading: string; id: string }[] = headingsRaw.map((str) => {
        let title = str.replaceAll(/<h\d id=".+">/g, '');
        title = title.replaceAll(/<\/h\d>/g, '');

        let id = str.match(/id="[^"]+"/g)[0] ?? '';
        id = id.replace('id=', '');
        id = id.replaceAll('"', '');
        return { heading: title, id: id };
      });

      // find matching ones
      for (const { heading, id } of headings) {
        if (heading.toLocaleLowerCase().includes(query)) {
          const crumbs = [
            { display: dirNameToDisplayName.get(article.directory), link: '/' },
            { display: title, link: `/articles/${article.directory}/${article.id}` },
            { display: heading, link: `/articles/${article.directory}/${article.id}#${id}` }
          ];

          hits.push(new Hit('heading', crumbs, title, 0));
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
