<script>
  import { afterNavigate } from '$app/navigation';
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

<svelte:head>
  <!-- this enables rich link previews -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://wiki.taskforcehellcat.de/articles/{data.directory}/{data.id}" />
  <meta property="og:title" content={data.title} />
  <meta
    property="og:image:secure_url"
    content="https://wiki.taskforcehellcat.de/images/thumbnails/{data.id}.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:site_name" content="Task Force Hellcat Wiki" />
  <meta property="og:modified_time" content={new Date(data.date).toISOString()} />
  <meta property="og:locale" content="de_DE" />
</svelte:head>

<section>
  <h1>{data.title}</h1>

  <!-- Use svelte:component instead of <Content/> to force reactivity if content changes (like changing articles) -->
  <svelte:component this={data.Content} />
</section>
