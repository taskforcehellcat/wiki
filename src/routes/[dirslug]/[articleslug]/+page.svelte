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
    // TODO
    /**
     * I think we can delete this whole block,
     * but I wont do it now because I am fixing 
     * #88 right now.
    */

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
      const mainElement = document.getElementById('main');
      if (mainElement) {
        mainElement.scrollTop = 0;
      } else {
        console.warn(
          `Element with id "main" wasn't found, automatic scrolling may not work correctly.`
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
