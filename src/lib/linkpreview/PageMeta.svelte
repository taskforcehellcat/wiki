<script lang="ts">
  export let data;

  let title = data.title;
  let dir = data.dirslug;
  let article = data.articleslug;
</script>

<svelte:head>
  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="description" content="Artikel im TFHC Wiki" />

  <!-- Facebook Meta Tags -->
  <meta
    property="og:url"
    content="https://feature-opengraph.wiki.taskforcehellcat.de/articles/ausbildung/fahrzeugerkennung"
  />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content="Platzhalter" />
  <meta
    property="og:image"
    content="https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/{article}.png"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="feature-opengraph.wiki.taskforcehellcat.de" />
  <meta
    property="twitter:url"
    content="https://feature-opengraph.wiki.taskforcehellcat.de/articles/ausbildung/fahrzeugerkennung"
  />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content="bla" />
  <meta
    name="twitter:image"
    content="https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/{article}.png"
  />
</svelte:head>
