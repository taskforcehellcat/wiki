<script>
  export let data;
  /*
  This was an idea to fix anchor links, it doesn't work.

  import { onMount } from 'svelte';
  onMount(() => {
    if (window.location.hash) {
      let hash = window.location.hash;

      if (hash.length) {
        hash = hash.replace('%C3%A4', 'ä');

        document.querySelector(hash).scrollIntoView();
      }
    }
  });
  */

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
