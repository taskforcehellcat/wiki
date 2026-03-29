<!-- Homepage -->
<script lang="ts">
  export let data;

  import { onMount } from 'svelte';
  import '../app.scss';
  import ThemePicker from '$lib/pickers/ThemePicker.svelte';
  import LayoutPicker from '$lib/pickers/LayoutPicker.svelte';
  import TreeView from '$lib/nav/TreeView.svelte';
  import { themeId } from '$lib/pickers/stores';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import { beforeNavigate } from '$app/navigation';

  import { resolve } from '$app/paths';
  import Searchbar from '$lib/search/Searchbar.svelte';

  $: wikiItems = data.menu.map((dir) => ({
    id: dir.id,
    label: dir.config.title,
    children: dir.entries.map((article) => ({
      id: article.id,
      label: article.meta.title_short || article.meta.title,
      href: resolve(`/${dir.id}/${article.id}`)
    }))
  }));

  let homeEl: HTMLElement;
  let homeTopEl: HTMLDivElement;
  let searchEl: HTMLDivElement;
  let homeNavEl: HTMLDivElement;

  let initialNavHeight = 0;
  let paddingTop = 0;

  function updatePadding() {
    if (!homeEl || !homeTopEl || !searchEl || initialNavHeight === 0) return;
    const gap = parseFloat(getComputedStyle(homeEl).gap) || 0;
    const contentHeight =
      homeTopEl.offsetHeight +
      searchEl.offsetHeight +
      initialNavHeight +
      gap * 2;
    paddingTop = Math.max(0, (window.innerHeight - contentHeight) / 2);
  }

  onMount(() => {
    initialNavHeight = homeNavEl?.offsetHeight ?? 0;
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
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
    <main
      class="home"
      id="main-content"
      style="padding-top: {paddingTop}px"
      bind:this={homeEl}>
      <div class="home__top" bind:this={homeTopEl}>
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

      <div class="home__search" bind:this={searchEl}>
        <Searchbar />
      </div>

      {#if !$searchInUse}
        <div class="home__nav" bind:this={homeNavEl}>
          <TreeView items={wikiItems} />
        </div>
      {/if}
    </main>
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
    width: 100%;
    min-height: 100%;
    height: fit-content;
    background-color: var(--color-bg-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-muted);
    padding-inline: 2rem;
    gap: 4rem;
  }

  .home__logo {
    font-size: var(--font-size-3xl);
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

  .home__search {
    width: min(80rem, 100%);

    :global(#search-bar .placeholder) {
      font-size: var(--font-size-lg);
    }

    :global(#search-bar .placeholder::before) {
      font-size: var(--font-size-xl);
    }

    :global(#search-bar) {
      background-color: var(--color-bg-secondary);
      width: 100%;
      height: 2.5rem;
      padding: 3.5rem;
      border: 1px solid transparent;
      border-radius: 1.5rem;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        border-color: var(--color-border-muted);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }

      &:focus-within {
        border-color: var(--color-border);
      }
    }

    :global(kbd) {
      color: var(--color-kbd-text);
      background-color: var(--color-kbd-bg);
      border-radius: 0.35rem;
      font-family: 'Fira Mono', monospace;
      font-size: 1.5rem;
      width: fit-content;
      min-width: 2rem !important;
      text-align: center;
      border: 1px solid var(--color-kbd-border);
      padding: 0.15rem 0.5rem;
      box-shadow: 0 1px 0 var(--color-kbd-border);

      &:not(kbd:first-of-type) {
        margin-left: 0.1rem;
      }
    }
  }
</style>
