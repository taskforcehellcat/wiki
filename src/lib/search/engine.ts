import INTERNALNAME_TO_DISPLAYNAME from './lookup.json' assert { type: 'json' };

export class hit {
  /**
   * `type`
   * signifies the kind of text this matches
   * `breadcrumbs`
   * is used to link to the hit and the 'parents'
   * `text`
   * is the environment in which it is situated
   * `occurrence`
   * is the occurrence in said text to enable unique
   * identification in case the same text matches multiple times
   */

  type: 'page' | 'heading' | 'text';
  breadcrumbs: Array<{ display: string; link: string }>;
  text: string;
  occurrence: number;
}

export class Search {
  index: {};

  constructor(index) {
    this.index = index;
  }

  query(query: string) {
    /*
     * Searches for the query in the index.
     * May return: Array<hit>
     * May throw TODO document exception cases here
     */

    query = query.toLowerCase().trim();

    // will hold all the hits to be returned
    let hits: Array<hit> = [];

    /*
      What follows are insufferably deep nested loops.

      Abandon all hope,
      ye who enter here.
    */

    Object.keys(this.index).forEach((categoryName) => {
      let categoryObj = this.index[categoryName];
      console.debug(categoryName);

      Object.keys(categoryObj).forEach((pageName) => {
        let pageObj = categoryObj[pageName];
        console.debug(pageName);

        // check if the page title directly matches the query
        if (pageName.toLowerCase().includes(query)) {
          let h = new hit();
          h.type = 'page';
          h.breadcrumbs = this.breadcrumbsArray([categoryName, pageName]);
          hits.push(h);
        }

        // look for hits without a heading
        if (Object.hasOwn(pageObj, 'no-heading')) {
          pageObj['no-heading'].forEach((text) => {
            // just to make ts happy:
            if (!(typeof text == 'string')) {
              console.error('The content index seems to be malformed.');
              return;
            }

            let occurrences = 0;

            let cursor = 0;
            while (text.substring(cursor).includes(query)) {
              occurrences++;

              // discard text already looked at
              cursor = text.substring(cursor).indexOf(query) + query.length;

              let h = new hit();
              h.type = 'text';
              h.text = text;
              h.occurrence = occurrences;
              h.breadcrumbs = this.breadcrumbsArray([categoryName, pageName]);
            }
          });
        }
      });
    });

    return hits;
  }

  breadcrumbsArray(pathArray: Array<string>) {
    let array: Array<{ display: string; link: string }> = []; // to be returned

    let [category, page, heading] = pathArray;

    let linkToPage = '/articles/' + INTERNALNAME_TO_DISPLAYNAME[category] + '/' + INTERNALNAME_TO_DISPLAYNAME[page];

    array.push({ display: category, link: '/' });
    array.push({ display: page, link: linkToPage });

    // if a heading is provided, also add it
    if (!(pathArray.length == 2)) {
      const REPLACEMENTS = {
        ' ': '-',
        '\u00e4': 'ae', // ä
        '\u00fc': 'ue', // ü
        '\u00f6': 'oe', // ö
        '\u00df': 'ss' // ß
      };

      for (const [k, v] of Object.entries(REPLACEMENTS)) {
        heading = heading.replaceAll(k, v);
      }

      array.push({ display: heading, link: `${linkToPage}#${heading}` });
    }

    return array;
  }
}
