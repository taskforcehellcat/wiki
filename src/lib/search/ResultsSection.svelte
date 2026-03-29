<script lang="ts">
  import { searchResults } from '$lib/search/stores';
  import type { Hit, HitKind, PreviewChunk } from './.d.ts';
  import { resolve } from '$app/paths';

  export let kind: HitKind;
  export let query: string = '';

  function highlightText(text: string): Array<PreviewChunk> {
    if (!query) return [{ text, highlighted: false }];
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const chunks: Array<PreviewChunk> = [];
    let prev = 0;
    for (const match of text.matchAll(regex)) {
      const idx = match.index ?? 0;
      if (idx > prev) chunks.push({ text: text.slice(prev, idx), highlighted: false });
      chunks.push({ text: match[0], highlighted: true });
      prev = idx + match[0].length;
    }
    if (prev < text.length) chunks.push({ text: text.slice(prev), highlighted: false });
    return chunks;
  }

  const asRoute = (link: string) => link as '/' | `/${string}/${string}`;

  let resultsOfKind: Array<Hit>;

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
      <span>gefunden:</span>
    </span>
    {#each resultsOfKind as hit, i (i)}
      <span class="breadcrumbs">
        {#each hit['breadcrumbs'] as crumb (crumb.link)}
          <a href={resolve(asRoute(crumb.link))}>
            {#each highlightText(crumb.display) as chunk, k (k)}
              {#if chunk.highlighted}<mark>{chunk.text}</mark>{:else}{chunk.text}{/if}
            {/each}
          </a>
          <span class="material-icons-round seperator" aria-hidden="true">
            chevron_right
          </span>
        {/each}
      </span>
      {#if kind === 'text'}
        <p class="preview-text">
          {#each hit.previewChunks ?? [] as chunk, j (j)}
            {#if chunk.highlighted}
              <mark>{chunk.text}</mark>
            {:else}
              {chunk.text}
            {/if}
          {/each}
        </p>
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
    gap: 0.5rem;

    span:not(:last-of-type) {
      font-weight: 600;
    }
  }

  .hit-count {
    grid-column: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 0.85em;

    aspect-ratio: 1/1;
    border-radius: 100%;
    background-color: var(--color-bg-secondary);

    color: var(--color-neutral);
  }

  .breadcrumbs {
    color: var(--color-text-primary);

    grid-column: 2;
    display: block;
    padding: 0.2rem 0;

    a {
      font-weight: 500;
      font-size: 0.85em;
      letter-spacing: 0.12rem;
      text-decoration: none;

      color: var(--color-text-secondary);
      transition: color 0.2s ease-out;

      &:last-of-type {
        color: var(--color-text-primary);
        font-weight: 600;
        &:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      }

      &:hover:not(:first-child) {
        color: var(--color-text-muted);
      }
    }

    .seperator {
      font-size: 1.4rem;
      vertical-align: middle;
      opacity: 0.5;
    }

    .seperator:last-child {
      display: none;
    }
  }

  .preview-text {
    grid-column: 2;
    font-style: italic;
    text-align: justify;
    font-size: 0.95em;
    line-height: 1.5;
    opacity: 0.85;
  }
</style>
