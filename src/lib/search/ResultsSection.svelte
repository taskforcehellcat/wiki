<script lang="ts">
  import { searchResults } from '$lib/search/stores';
  import type { Hit, HitKind } from './.d.ts';

  export let kind: HitKind;

  let resultsOfKind: Array<Hit> = [];

  $: resultsOfKind = $searchResults.filter((hit) => {
    return hit.type == kind;
  });

  let hitCount: number;
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
  $: if (hitCount == 1) {
    pageTitle = pageTitle.replace('Textstellen', 'Textstelle');
    pageTitle = pageTitle.replace('Abschnitte', 'Abschnitt');
  }
</script>

{#if hitCount !== 0}
  <div class="container">
    <span class="hit-count"><div>{hitCount}</div></span>
    <span class="heading">
      <span>{pageTitle}</span>
      <span>gefunden</span>
    </span>
    {#each resultsOfKind as hit}
      <span class="breadcrumbs">
        {#each hit['breadcrumbs'] as crumb}
          <a href={crumb.link}>{crumb.display}</a><span
            class="material-icons-rounded seperator">chevron_right</span
          >
        {/each}
      </span>{#if kind === 'text'}
        <p class="preview-text">{@html hit.text}</p>
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
    gap: 1rem;

    margin-bottom: 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .heading {
    font-size: large;
    display: flex;
    align-items: center;

    span:not(:last-of-type) {
      margin-right: 1rem;
      color: var(--brandNeutral);
    }
  }

  .hit-count {
    grid-column: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--brandSecondaryBG);
    font-weight: 600;

    aspect-ratio: 1/1;
    border-radius: 100%;
    background-color: var(--brandTertiaryTXT);
  }

  .breadcrumbs {
    color: var(--brandTertiaryTXT);

    grid-column: 2;
    display: block;

    a {
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.12rem;
      text-decoration: none;

      color: var(--brandTertiaryTXT);
      transition: color 0.2s ease-out;

      &:last-of-type {
        color: var(--brandNeutral);
        &:hover {
          text-decoration: underline;
        }
      }

      &:hover:not(:first-child) {
        color: var(--brandNeutral);
      }
    }

    .seperator:last-child {
      display: none;
    }
  }

  .preview-text {
    grid-column: 2;
    font-style: italic;
    text-align: justify;
  }

  :global(mark) {
    background: linear-gradient(
      -100deg,
      hsla(48, 100%, 67%, 0.3),
      hsla(54, 95%, 57%, 0.616) 95%,
      hsla(48, 92%, 75%, 0.1)
    );
    border-radius: 1rem 0;
    padding: 0.2rem;

    color: var(--brandSecondaryTXT);
  }
</style>
