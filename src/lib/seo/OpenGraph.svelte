<script>
  export let imgUrl;
  export let url;
  export let title;
</script>

<svelte:head>
  <title>{title}</title>

  <meta property="og:site_name" content="Task Force Hellcat Wiki" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:url" content={url} />

  <meta property="og:image" content={imgUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:image:alt" content="Artikelbanner" />
  <!-- Twitter props are used by Discord -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="taskforcehellcat.de" />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:image" content={imgUrl} />

  <!-- Meta Tags Generated via https://www.opengraph.xyz -->

  Preview How your website is displayed on search engines & social media. Facebook github.com Twitter
</svelte:head>
