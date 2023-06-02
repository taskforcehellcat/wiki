<script lang="ts">
  import { page } from '$app/stores';

  let data = $page.data;

  let title = data.title;
  let dir = data.dirslug;
  let article = data.articleslug;
  let description = data.description ?? 'Artikel im TFHC Wiki';

  let url = `https://wiki.taskforcehellcat.de/${dir}/${article}`;

  // let thumbnailsUrl = `https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/`
  // use this in production:
  let thumbnailsUrl = `https://wiki.taskforcehellcat.de/images/thumbnails/`;

  $: title = $page.data.title;
</script>

<svelte:head>
  <!-- HTML Meta Tags -->
  <title>{title} | TFHC Wiki</title>
  <meta name="description" content={description} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`${thumbnailsUrl}${article}.png`} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="wiki.taskforcehellcat.de" />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${thumbnailsUrl}${article}.png`} />
</svelte:head>
