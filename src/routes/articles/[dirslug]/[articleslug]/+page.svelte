<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import OpenGraph from '$lib/seo/OpenGraph.svelte';
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

  const propsOpenGraph = {
    imgUrl: `https://feature-opengraph.wiki.taskforcehellcat.de/images/thumbnails/${data.articleslug}.png`,
    url: `http://feature-opengraph.wiki.taskforcehellcat.de/articles/${data.dirslug}/${data.articleslug}.png`,
    title: `${data.title} · TFHC Wiki`
  };
</script>

<OpenGraph {...propsOpenGraph} />

<section>
  <h1>{data.title}</h1>

  <!-- Use svelte:component instead of <Content/> to force reactivity if content changes (like changing articles) -->
  <svelte:component this={data.Content} />
</section>
