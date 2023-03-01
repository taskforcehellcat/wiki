<script lang="ts">
  export let data;

  let title = data.title;
  let dir = data.dirslug;
  let article = data.articleslug;
  let description = data.description ?? 'Artikel im TFHC Wiki';

  let url = `https://wiki.taskforcehellcat.de/articles/${dir}/${article}`;
</script>

<svelte:head>
  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={url} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="wiki.taskforcehellcat.de" />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://wiki.taskforcehellcat.de/images/thumbnails/{article}.png" />
</svelte:head>
