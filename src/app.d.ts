/// <reference types="@sveltejs/kit/types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    userid: string;
  }

  // interface Platform {}

  // interface Session {}

  // interface Stuff {}
}

export type Menu = {
  [key: string]: Directory;
};

export type Directory = {
  entries: Array<Article>;
  id: string;
  config: {
    title: string;
    date: string;
    nav_index: number;
  };
};

export type Article = {
  meta: {
    title: string;
    title_short: string;
    date: string;
    nav_index: number;
  };
  id: string;
  directory: string;
  html: string;
};

// FIXME you should be able to get this dynamically...
type ArticleFile = {
  metadata: Article['meta'];
  default: {
    render: () => {
      html: string;
    };
  };
};
