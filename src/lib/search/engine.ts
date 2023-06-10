import type { Hit, Breadcrumb, HitKind } from './.d.ts';
import type { Article, Directory } from '../../app.js';
import * as htmlparser2 from 'htmlparser2';

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

    // *** abandon all hope, ye who enter here. ***

    query = query.toLowerCase().trim();

    if (query.length == 0) {
      throw Error('Cannot search for empty string.');
    }

    // will hold all the hits to be returned
    let hits: Array<Hit> = [];

    // will be used to keep track of the state while traversing the ast and articles
    let currentArticle: Article;
    let currentH2: { title?: string; id: string } | null = null;
    let currentH3: { title?: string; id: string } | null = null;

    let currentlyNotAHeading = true;

    const directoryIdsToDisplay = this.directoryIdsToDisplay;

    function get_crumbs(article: Article): Array<Breadcrumb> {
      // placing might look weird but we need this to be local to
      // both the Search class and the htmlparser2.Parser callbacks
      return [
        {
          display: directoryIdsToDisplay.get(article.directory) ?? 'undefined',
          link: `/`
        },
        {
          display: article.meta.title_short ?? article.meta.title,
          link: `/${article.directory}/${article.id}`
        }
      ];
    }

    // h-hey wh- no regexes???? owo

    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        // h2 opens
        if (name === 'h2') {
          currentH2 = {
            title: undefined,
            id: attributes['id']
          };

          currentlyNotAHeading = false;

          // if an h2 opens, we want to register hits directly under it
          // not under any h3 from the last section.
          currentH3 = null;
        }

        // h3 opens
        if (name === 'h3') {
          currentH3 = {
            title: undefined,
            id: attributes['id']
          };

          currentlyNotAHeading = false;
        }
      },

      onclosetag(name) {
        if (name === 'h2' || name === 'h3') {
          // text that follows this instruction belongs to an element that is not a heading.
          currentlyNotAHeading = true;
        }
      },

      ontext(text) {
        // first text that follows a heading opening tag is its content
        if (currentH2) {
          currentH2.title ??= text;
        }
        if (currentH3) {
          currentH3.title ??= text;
        }

        if (!text.toLowerCase().includes(query)) return;

        /* register a hit */

        // determine kind
        let kind: HitKind;

        if (currentlyNotAHeading) {
          kind = 'text';
        } else if (currentH3 || currentH2) {
          kind = 'heading';
        } else {
          kind = 'article';
        }

        // insert maker to text
        // TODO make this type safe
        if (kind === 'text') {
          const indices = [
            ...text.toLowerCase().matchAll(new RegExp(query, 'gi'))
          ].map((a) => a.index);

          let splits: Array<string> = [];
          indices.forEach((index) => {
            splits.push(
              text.slice(0, index),
              '<mark>',
              text.slice(index, index + query.length),
              '</mark>',
              text.slice(index + query.length)
            );
          });

          text = splits.join('');
        }

        // determine breadcrumbs to hit
        let crumbs: Array<Breadcrumb> = [];

        // article is always there
        let articleLink = `/${currentArticle.directory}/${currentArticle.id}`;
        crumbs = get_crumbs(currentArticle);

        if (currentH2) {
          crumbs.push({
            display: currentH2.title ?? 'undefined',
            link: articleLink + `#${currentH2.id}`
          });
        }

        if (currentH3) {
          crumbs.push({
            display: currentH3.title ?? 'undefined',
            link: articleLink + `#${currentH3.id}`
          });
        }

        hits.push({
          type: kind,
          breadcrumbs: crumbs,
          text: text
        });
      }
    });

    this.articles.forEach((article) => {
      currentArticle = article;

      // the .svx files do not contain h1 headings,
      // we need to check for article matches manually.

      if (
        currentArticle.meta.title_short?.toLowerCase().includes(query) ||
        currentArticle.meta.title.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'article',
          breadcrumbs: get_crumbs(currentArticle),
          text: currentArticle.meta.title_short ?? currentArticle.meta.title
        });
      }

      // search article contents
      parser.write(article['html']);

      currentH2 = null;
      currentH3 = null;
      currentlyNotAHeading = true;
    });

    return hits;
  }
}
