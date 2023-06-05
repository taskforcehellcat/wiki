<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  export let data;

  const umlautReplacements = [
    ['%C3%A4', 'ä'],
    ['%C3%B6', 'ö'],
    ['%C3%BC', 'ü'],
    ['%C3%9F', 'ß']
  ];

  afterNavigate(() => {
    // NOTE: this does not work if it's included inside of +layout.svelte
    if (window.location.hash) {
      let hash = window.location.hash.replace('#', '');

      if (hash.length > 0) {
        // NOTE: i dont know why this is necessary…
        // replace escape sequences by unicode characters
        for (const [k, v] of umlautReplacements) {
          hash = hash.replaceAll(k, v);
        }
        document.getElementById(hash)?.scrollIntoView();
      }
    } else {
      // scroll to top if there is no hash provided
      const mainElemenet = document.getElementById('main');

      if (mainElemenet) {
        mainElemenet.scrollTop = 0;
      } else {
        console.warn(
          `Couldn't scroll top because no "main" element was found.`
        );
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
