import type { Hit, Breadcrumb, HitKind } from './.d.ts';
import type { Article, Directory } from '../../app.js';
import * as htmlparser2 from 'htmlparser2';

type Heading = {
  content?: string;
  id: string;
};

const HEADINGS = ['h2', 'h3', 'h4', 'h5'];

export class Search {
  // constants
  articles: Array<Article>;
  directoryIdsToDisplay: Map<string, string>;
  parser: htmlparser2.Parser;

  // state
  currentArticle!: Article;
  currentHeading?: Heading;
  currentText: string = '';

  hits: Array<Hit> = [];
  queryLower: string = '';

  constructor(articles: Array<Article>, menu: Array<Directory>) {
    const self = this;
    this.articles = articles;
    this.directoryIdsToDisplay = new Map(
      menu.map((e) => {
        return [e.id, e.config.title];
      })
    );

    // wha-whats this??? no regexes?? owo
    this.parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        // handle `li` tags
        if (name === 'li') {
          self.currentText += ' - ';
        }

        // update the heading
        if (HEADINGS.includes(name)) {
          // before updating the heading, search the text
          if (self.currentText.toLowerCase().includes(self.queryLower)) {
            self.add_hit('text');
          }

          self.currentHeading = {
            content: undefined,
            id: attributes['id']
          };

          self.currentText = '';
        }
      },

      ontext(text) {
        // this text might be the content of a new heading
        let textIsHeading = false;

        if (self.currentHeading && !self.currentHeading.content) {
          self.currentHeading.content = text;
          textIsHeading = true;

          // register hits
          if (text.toLowerCase().includes(self.queryLower)) {
            self.add_hit('heading');
          }
        }

        if (!textIsHeading) {
          // handle example boxes
          if (text.trim() === 'add') {
            text = '';
          } else if (text.trim() === 'Beispiel:') {
            text = ' (Beispielbox)';
          }
          self.currentText += text;
        }
      },

      onclosetag(name) {
        if (name === 'p') {
          self.currentText += ' ';
        }
      }
    });
  }

  breadcrumbs(article: Article): Array<Breadcrumb> {
    return [
      // section part
      {
        display:
          this.directoryIdsToDisplay.get(article.directory) ?? 'undefined',
        link: `/`
      },
      // article part
      {
        display: article.meta.title_short ?? article.meta.title,
        link: `/${article.directory}/${article.id}`
      }
    ];
  }

  query(query: string): Array<Hit> {
    this.queryLower = query.toLowerCase().trim();
    this.hits = [];

    if (this.queryLower.length == 0) {
      throw new Error('Cannot search for empty string.');
    }

    this.articles.forEach((article) => {
      this.currentHeading = undefined;
      this.currentText = '';
      this.currentArticle = article;

      // register hit in the article name
      if (
        article.meta.title.toLowerCase().includes(this.queryLower) ||
        article.meta.title_short?.toLowerCase().includes(this.queryLower)
      ) {
        this.add_hit('article');
      }

      // register hits in the body
      this.parser.write(article['html']);

      // only every new heading triggers text search, so we need to do this once here
      // because of the last text on the article that is not followed by a heading
      if (this.currentText.toLowerCase().includes(this.queryLower)) {
        this.add_hit('text');
      }
    });

    return this.hits;
  }

  add_hit(kind: HitKind): void {
    const article = this.currentArticle;
    let crumbs = this.breadcrumbs(article);

    if (kind === 'article') {
      this.hits.push({
        type: kind,
        breadcrumbs: crumbs
      });

      return;
    }

    const heading = this.currentHeading;
    const articleLink = crumbs[1].link;

    if (heading) {
      crumbs.push({
        display: heading.content ?? '',
        link: `${articleLink}#${heading?.id}`
      });
    }

    this.hits.push({
      type: kind,
      breadcrumbs: crumbs,
      text: kind === 'text' ? this.highlight(this.currentText) : undefined
    });
  }

  highlight(text: string): string {
    text = text.replaceAll('\n', '');
    const regex = new RegExp(this.queryLower, 'gi');
    return text.replace(regex, '<mark>$&</mark>');
  }
}
