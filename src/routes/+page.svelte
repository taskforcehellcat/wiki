<!-- Homepage -->
<script lang="ts">
  import '../app.scss';
  import Theme from '$lib/theme/Theme.svelte';
  import Nav from '$lib/nav/Nav.svelte';
  import { themeId } from '$lib/theme/stores';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import ResultsSection from '$lib/search/ResultsSection.svelte';

  export let data;

  let rawInput = '';
  let query; // holds the query
  let showResults = false; // whether the search bar is currently in use
  let search = new Search(data.posts);

  $: query = rawInput.trim();
  $: $searchInUse = query.length > 0;

  $: if (query.length > 2) {
    $searchResults = search.query(query);
  }

  $: showResults = query.length > 2;
</script>

<svelte:head>
  <title>Home | TFHC Wiki</title>
</svelte:head>

{#if $themeId}
  <div id="main" data-theme={$themeId}>
    <Theme />
    <div id="home">
      <div id="home__top">
        <a id="home__link" href="https://taskforcehellcat.de/"
          ><span class="material-icons"> chevron_left </span>
          Zurück zur Hauptseite</a
        >
        <img
          id="home__nav__logo"
          class="noselect"
          src="/images/tfhcwiki_full.svg"
          alt="Task Force Hellcat Logo"
        />
      </div>

      <!-- search bar -->
      <div id="search" data-empty={(query.length === 0).toString()}>
        <div id="search__searchbar">
          <span class="material-icons noselect">search</span>
          <input type="text" name="search" placeholder="Wiki durchsuchen…" bind:value={rawInput} />
        </div>
        <div id="search__results">
          {#if showResults}
            {#if $searchResults.length !== 0}
              <ResultsSection kind="article" />
              <ResultsSection kind="heading" />
              <ResultsSection kind="text" />
            {:else}
              <p><span class="search__errortext">Es wurden keine Übereinstimmungen gefunden!</span></p>
            {/if}
          {:else}
            <p><span class="search__errortext">Bitte mindestens drei Zeichen eingeben!</span></p>
          {/if}
        </div>
      </div>
      <div id="home__nav">
        <Nav menu={data.menu} />
      </div>
    </div>
  </div>
{/if}

<style>
  #home {
    padding: 15rem 5rem 20%;
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: var(--brandPrimaryBG);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--brandTertiaryTXT);
    gap: 4rem;
  }

  #home__nav__logo {
    font-size: 35pt;
    font-weight: 300;
    color: var(--brandNeutral);
    text-align: center;
    white-space: nowrap;
  }

  #home__top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #search__searchbar {
    background-color: var(--brandSecondaryBG);
    width: 80rem;
    height: 3rem;
    border-radius: 0.7rem;
    -webkit-border-radius: 0.7rem;
    -moz-border-radius: 0.7rem;
    -ms-border-radius: 0.7rem;
    -o-border-radius: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 3.5rem;
  }

  #search__searchbar input {
    width: 100%;
    height: 24px;
    color: var(--brandTertiaryTXT);
    font-size: 14pt;
    font-weight: 300;
  }

  #search__searchbar .material-icons {
    font-size: 20pt;
    color: var(--brandTertiaryTXT);
  }

  .search__errortext {
    color: var(--errorTXT);
  }
</style>
