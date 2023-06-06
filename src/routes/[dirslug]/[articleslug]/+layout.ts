import type { Article, Directory, Menu } from '../../../app.js';

function sortArticlesByNavIndex(a: Article, b: Article) {
  if (!(a.meta.nav_index && b.meta.nav_index)) {
    return a.meta.title.localeCompare(b.meta.title);
  } else {
    return a.meta.nav_index - b.meta.nav_index;
  }
}

function sortDirectoriesByNavIndex(a: Directory, b: Directory) {
  if (!(a.config.nav_index && b.config.nav_index)) {
    return a.config.title.localeCompare(b.config.title);
  } else {
    return a.config.nav_index - b.config.nav_index;
  }
}

export async function load({ fetch }) {
  const response = await fetch(`/api/articles`);
  const articles: Array<Article> = await response.json();

  let menu: Menu = {};

  for (const article of articles) {
    menu[article.directory] ??= {
      entries: [],
      id: article.directory,
      config: { title: '', date: '', nav_index: 0 }
    };
    menu[article.directory].entries.push(article);
  }

  for (const [key] of Object.entries(menu)) {
    menu[key].config = (
      await import(`../../../content/${key}/metadata.js`)
    ).config;
    menu[key].entries.sort((a, b) => sortArticlesByNavIndex(a, b));
  }

  let directories = Object.keys(menu).map(function (key) {
    return menu[key];
  });

  directories.sort((a, b) => sortDirectoriesByNavIndex(a, b));
  return {
    posts: articles,
    menu: directories
  };
}
