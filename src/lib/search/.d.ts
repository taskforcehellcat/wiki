export type Hit = {
  // whether this hit is a page itself, a heading on this page
  // or in a text on this page
  type: 'article' | 'heading' | 'text';
  // basically the path to the hit(s)
  breadcrumbs: Array<Breadcrumb>;
  // the text in witch the index occurred or the heading or article name
  text: string;
  // the index at which the hit occurs in the text
  occurrence: number;
};

export type Breadcrumb = {
  display: string;
  link: string;
};

export type HitKind = 'article' | 'heading' | 'text';
