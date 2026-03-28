<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import ResultsSection from '$lib/search/ResultsSection.svelte';

  let rawInput = '';
  let query: string; // holds the query
  let showResults: boolean; // whether the search bar is currently in use
  let search = new Search($page.data.posts, $page.data.menu);

  $: query = rawInput.trim();

  $: if (query.length > 2) {
    $searchResults = search.query(query);
  }

  $: showResults = query.length > 2;

  let searchModalInput: HTMLInputElement;

  onMount(function () {
    searchModalInput.focus();
  });

  beforeNavigate(() => {
    // hide the modal when navigating
    $searchInUse = false;
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      $searchInUse = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="search dialog"
  role="dialog"
  aria-modal="true"
  aria-label="Wiki durchsuchen">
  <div id="input-wrapper">
    <input
      type="text"
      placeholder="Wiki durchsuchen..."
      aria-label="Wiki durchsuchen"
      bind:this={searchModalInput}
      bind:value={rawInput} />
  </div>

  <div class="search results">
    {#if showResults}
      {#if $searchResults.length !== 0}
        <ResultsSection kind="article" />
        <ResultsSection kind="heading" />
        <ResultsSection kind="text" />
      {:else}
        <span class="search errortext">
          <p>Es wurden keine Übereinstimmungen gefunden!</p>
        </span>
      {/if}
    {:else}
      <span class="search errortext">
        <p>Bitte mindestens drei Zeichen eingeben!</p>
      </span>
    {/if}
  </div>
</div>

<div
  id="bg-tint"
  aria-hidden="true"
  on:click={() => {
    $searchInUse = false;
  }}
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      $searchInUse = false;
    }
  }}>
</div>

<style lang="scss">
  .search {
    &.dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--color-bg-primary);
      width: min(75rem, calc(100% - 4rem));
      height: 40rem;
      border-radius: 1.2rem;
      border: 1px solid var(--color-border);

      display: flex;
      flex-direction: column;
      z-index: 100;

      box-shadow:
        0 24px 48px -12px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(0, 0, 0, 0.1);

      animation: modal-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      @keyframes modal-enter {
        from {
          opacity: 0;
          transform: translate(-50%, -48%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }

      #input-wrapper {
        width: 100%;
        display: flex;
        gap: 2rem;
        border-top-right-radius: 1.2rem;
        border-bottom: 1px solid var(--color-border);
        border-top-left-radius: 1.2rem;
        padding-inline: 4rem;

        input {
          border-top-right-radius: inherit;
          border-top-left-radius: inherit;
          font-size: 2rem;
          height: 100%;
          width: 100%;
          color: var(--color-text-muted);
          padding-block: 2rem;
          display: flex;
          align-items: center;
        }

        &:before {
          content: 'search';
          display: inline;
          width: fit-content;
          font-size: 2.8rem;
          font-family: 'Material Icons Round';
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
        }
      }

      /* fade overflowing text */
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: linear-gradient(
          rgba(255, 255, 255, 0) 85%,
          var(--color-bg-primary)
        );
        pointer-events: none;
        border-radius: inherit;
      }
    }

    &.results {
      height: 100%;

      margin-left: 2rem;
      margin-right: 2rem;
      margin-bottom: 0;
      padding-bottom: 5rem;
      padding-top: 2rem;
      color: var(--color-text-muted);

      overflow-y: scroll;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
      }
    }

    &.errortext {
      color: var(--color-warning-text);

      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
    }
  }

  #bg-tint {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: tint-enter 0.15s ease;

    @keyframes tint-enter {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
