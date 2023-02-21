import { searchResults } from '$lib/search/stores';

// This information would be already available by the config property of
// a menu entry object, but i want to get a prototype going therefore
// i'll implement it this way for the time being and mark it TODO.

const dirNameToDisplayName = new Map([
  ['ueber-uns', 'Über uns'],
  ['ausbildung', 'Ausbildung'],
  ['sanitaetsdienst', 'Sanitätsdienst'],
  ['streitkraefte', 'Streitkräfte'],
  ['panzertruppen', 'Panzertruppen'],
  ['logistik', 'Logistik'],
  ['aufklaerer', 'Aufklärer'],
  ['fuhrpark', 'Fuhrpark']
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
      let html = article['html'];
      let htmlLower = html.toLowerCase();

      // check if the article name itself is a match
      // prefer the short title if it is defined and matches
      let titleShort = article.meta.title_short ? article.meta.title_short : '';
      let title = article.meta.title;

      if (titleShort.toLocaleLowerCase().includes(query)) {
        let crumbs = [
          { display: dirNameToDisplayName.get(article.directory), link: '/' },
          { display: titleShort, link: `/articles/${article.directory}/${article.id}` }
        ];
        hits.push(new Hit('article', crumbs, titleShort, 0));
      } else if (title.toLocaleLowerCase().includes(query)) {
        let crumbs = [
          { display: dirNameToDisplayName.get(article.directory), link: '/' },
          { display: title, link: `/articles/${article.directory}/${article.id}` }
        ];
        hits.push(new Hit('article', crumbs, title, 0));
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
