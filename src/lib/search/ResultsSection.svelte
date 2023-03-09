<script lang="ts">
  import { searchResults } from '$lib/search/stores';
  export let kind;

  let resultsOfKind = [];

  $: resultsOfKind = $searchResults.filter((hit) => {
    return hit.type == kind;
  });

  let hitCount;
  $: hitCount = resultsOfKind.length;

  let pageTitle: string;

  switch (kind) {
    case 'article':
      pageTitle = 'Artikel';
      break;
    case 'heading':
      pageTitle = 'Abschnitte';
      break;
    case 'text':
      pageTitle = 'Textstellen';
      break;
    default:
      throw new Error('Value Error');
  }

  // correct for singulars
  if (hitCount == 1) {
    pageTitle = pageTitle.replace('Textstellen', 'Textstelle');
    pageTitle = pageTitle.replace('Abschnitte', 'Abschnitt');
  }
</script>

{#if hitCount !== 0}
  <div class="container">
    <div class="heading count">{hitCount}</div>
    <span class="heading">
      <span class="heading title">{pageTitle}</span> <span class="heading text">gefunden</span>
    </span>
    {#each resultsOfKind as hit}
      <span />
      <span class="breadcrumbs">
        {#each hit['breadcrumbs'] as crumb}
          <a href={crumb.link}>{crumb.display}</a><span class="material-icons-rounded seperator"
            >chevron_right</span
          >
        {/each}
      </span>
    {/each}
  </div>
{/if}

<style lang="scss">
  .container {
    display: grid;
    gap: 5px;
    grid-template-columns: 30px auto;

    margin-bottom: 1em;
  }
  .container:last-child {
    margin-bottom: 0;
  }

  .heading.count {
    font-size: large;
    justify-self: right;
    margin-right: 1ch;
  }

  .heading.title {
    color: var(--navHover);
  }

  .breadcrumbs {
    color: var(--brandNeutral);
  }

  span.heading {
    font-size: large;
  }

  .heading.count {
    display: inline;
  }

  .breadcrumbs {
    color: var(--brandTertiaryTXT);
    display: block;
  }

  .breadcrumbs a {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.12rem;
    text-decoration: none;

    color: var(--brandTertiaryTXT);
    transition: color 0.2s ease-out;
  }
  .breadcrumbs a:last-of-type {
    color: var(--navHover);
  }
  .breadcrumbs a:last-of-type:hover {
    text-decoration: underline;
  }

  .breadcrumbs .seperator:last-child {
    display: none;
  }
</style>
