<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import ResultsSection from '$lib/search/ResultsSection.svelte';

  let rawInput = '';
  let query = ''; // holds the query
  let showResults = false; // whether the search bar is currently in use
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
</script>

<div id="search-dialog">
  <div id="input-wrapper">
    <input
      type="text"
      placeholder="Wiki durchsuchen..."
      bind:this={searchModalInput}
      bind:value={rawInput}
    />
  </div>

  {#if showResults}
    {#if $searchResults.length !== 0}
      <ResultsSection kind="article" />
      <ResultsSection kind="heading" />
      <ResultsSection kind="text" />
    {:else}
      <p>
        <span class="search__errortext"
          >Es wurden keine Übereinstimmungen gefunden!</span
        >
      </p>
    {/if}
  {:else}
    <p>
      <span class="search__errortext"
        >Bitte mindestens drei Zeichen eingeben!</span
      >
    </p>
  {/if}
</div>

<div
  id="bg-tint"
  role="dialog"
  on:click={() => {
    $searchInUse = false;
  }}
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      $searchInUse = false;
    }
  }}
/>

<style lang="scss">
  #search-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: min(75rem, 100%);
    height: 40rem;
    border-radius: 1.5rem;
    z-index: 100;

    #input-wrapper {
      width: 100%;
      height: 8rem;
      display: flex;
      gap: 2rem;
      border-top-right-radius: 1.5rem;
      border-bottom: 1px solid var(--border);
      border-top-left-radius: 1.5rem;
      padding-inline: 4rem;

      input {
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
        font-size: 2rem;
        color: var(--text);
        height: 100%;
        width: 100%;
        color: var(--brandSecondaryTXT);
        padding-block: 2rem;
        display: flex;
        align-items: center;
      }

      &:before {
        content: 'search';
        display: inline;
        width: fit-content;
        font-size: 2.8rem;
        font-family: 'Material Icons Rounded';
        color: #687076;
        display: flex;
        align-items: center;
      }
    }
  }

  #bg-tint {
    background-color: rgba(0, 0, 0, 0.55);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>