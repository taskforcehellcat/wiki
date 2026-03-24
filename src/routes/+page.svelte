<!-- Homepage -->
<script lang="ts">
  export let data;

  import '../app.scss';
  import ThemePicker from '$lib/pickers/ThemePicker.svelte';
  import LayoutPicker from '$lib/pickers/LayoutPicker.svelte';
  import TreeView from '$lib/nav/TreeView.svelte';
  import { themeId } from '$lib/pickers/stores';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import ResultsSection from '$lib/search/ResultsSection.svelte';
  import { beforeNavigate } from '$app/navigation';

  let rawInput = '';
  let query: string; // holds the query
  let showResults: boolean; // whether the search bar is currently in use
  let search = new Search(data.posts, data.menu);

  $: query = rawInput.trim();
  $: $searchInUse = query.length > 0;

  $: if (query.length > 2) {
    $searchResults = search.query(query);
  }

  $: showResults = query.length > 2;

  beforeNavigate(() => {
    // reset the query when leaving the site
    query = '';
  });
</script>

<svelte:head>
  <title>Home | TFHC Wiki</title>
  <meta name="description" content="Wiki der Arma Unit 'Task Force Hellcat'." />
</svelte:head>

{#if $themeId}
  <div id="main" data-theme={$themeId}>
    <div class="home__pickers">
      <ThemePicker location="article" />
      <LayoutPicker location="article" />
    </div>
    <div class="home" id="main-content">
      <div class="home__top">
        <a class="home__link" href="https://taskforcehellcat.de/">
          <span class="material-icons-round" aria-hidden="true">
            chevron_left
          </span>
          Zurück zur Hauptseite
        </a>
        <img
          class="home__logo noselect"
          src="/images/tfhcwiki_full.svg"
          alt="Task Force Hellcat Logo" />
      </div>

      <!-- search bar -->
      <div class="search">
        <div class="search__bar" class:search__bar--open={$searchInUse}>
          <span class="material-icons-round noselect">search</span>
          <input
            type="text"
            name="search"
            placeholder="Wiki durchsuchen…"
            aria-label="Wiki durchsuchen"
            bind:value={rawInput} />
        </div>
        {#if $searchInUse}
          <div class="search__results">
            {#if showResults}
              {#if $searchResults.length !== 0}
                <ResultsSection kind="article" />
                <ResultsSection kind="heading" />
                <ResultsSection kind="text" />
              {:else}
                <span class="search__error">
                  Es wurden keine Übereinstimmungen gefunden!
                </span>
              {/if}
            {:else}
              <span class="search__error">
                Bitte mindestens drei Zeichen eingeben!
              </span>
            {/if}
          </div>
        {/if}
      </div>

      {#if !$searchInUse}
        <div class="home__nav">
          <TreeView menu={data.menu} />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .home__pickers {
    position: absolute;
    top: 1.5rem;
    right: 2.5rem;
    display: flex;
    gap: 0.75rem;
    z-index: 10;
  }

  .home {
    position: relative;
    padding-top: 8%;
    width: 100%;
    min-height: 100%;
    height: fit-content;
    background-color: var(--color-bg-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-muted);
    gap: 4rem;
    padding-bottom: 6rem;
  }

  .home__logo {
    font-size: 35pt;
    font-weight: 300;
    color: var(--color-neutral);
    text-align: center;
    white-space: nowrap;
  }

  .home__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .search__bar {
    background-color: var(--color-bg-secondary);
    width: 80rem;
    height: 3rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 3.5rem;
    border: 1px solid transparent;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus-within {
      border-color: var(--color-text-muted);
    }
  }

  .search__bar input {
    width: 100%;
    height: 24px;
    color: var(--color-text-muted);
    font-size: 14pt;
    font-weight: 300;
  }

  .search__bar .material-icons-round {
    font-size: 20pt;
    color: var(--color-text-muted);
  }

  .search__bar--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search__results {
    height: fit-content;
    width: 80rem;
    background-color: var(--color-bg-secondary);
    padding: 1rem 3.5rem 3.5rem 3.5rem;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }

  .search__error {
    color: var(--color-error);
  }
</style>
