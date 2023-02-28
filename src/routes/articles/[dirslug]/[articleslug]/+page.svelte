<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { MetaTags } from 'svelte-meta-tags';
  export let data;

  const umlautReplacements = [
    ['%C3%A4', 'ä'],
    ['%C3%B6', 'ö'],
    ['%C3%BC', 'ü'],
    ['%C3%9F', 'ß']
  ];

  afterNavigate(() => {
    if (window.location.hash) {
      let hash = window.location.hash.replace('#', '');

      if (hash.length) {
        // NOTE: i dont know why this is necessary…
        // replace escape sequences by unicode characters
        for (const [k, v] of umlautReplacements) {
          hash = hash.replaceAll(k, v);
        }
        document.getElementById(hash).scrollIntoView();
      }
    }
  });

  // Custom Layout import since we can't use named slots here.
  // See https://github.com/sveltejs/kit/issues/627
  // import Layout from '../+layout.svelte'
  // Or: Fix footer another way
</script>

<section>
  <h1>{data.title}</h1>

  <!-- Use svelte:component instead of <Content/> to force reactivity if content changes (like changing articles) -->
  <svelte:component this={data.Content} />
</section>

<MetaTags
  title={data.title}
  titleTemplate="%s · TFHC Wiki"
  canonical="https://wiki.taskforcehellcat.de/"
  openGraph={{
    url: `https://feature-opengraph.wiki.taskforcehellcat.de/articles/${data.dirslug}/${data.articleslug}`,
    title: `${data.title}`,
    description: 'Platzhalter',
    images: [
      {
        url: `https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/${data.articleslug}.png`,
        width: 1200,
        height: 627,
        alt: 'Artikelbanner'
      }
    ],
    site_name: 'Task Force Hellcat Wiki'
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: `${data.title}`,
    description: 'Platzhalterbeschreibung',
    image: `https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/${data.articleslug}.png`,
    imageAlt: 'Artikelbanner'
  }}
/>
