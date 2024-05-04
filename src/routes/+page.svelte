<!-- Homepage -->
<script lang="ts">
  export let data;

  import '../app.scss';
  import ThemePicker from '$lib/pickers/ThemePicker.svelte';
  import Nav from '$lib/nav/Nav.svelte';
  import { themeId } from '$lib/pickers/stores';

  import { Search } from '$lib/search/engine';
  import { searchInUse, searchResults } from '$lib/search/stores';
  import ResultsSection from '$lib/search/ResultsSection.svelte';
  import { beforeNavigate } from '$app/navigation';

  let rawInput = '';
  let query: string; // holds the query
  let showResults = false; // whether the search bar is currently in use
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
    <!--ThemePicker location="home" /-->
    <div id="home">
      <div id="home__top">
        <a id="home__link" href="https://taskforcehellcat.de/"
          ><span class="material-icons-round"> chevron_left </span>
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
      <div id="search">
        <div id="search__searchbar" class:open={$searchInUse}>
          <span class="material-icons-round noselect">search</span>
          <input
            type="text"
            name="search"
            placeholder="Wiki durchsuchen…"
            bind:value={rawInput}
          />
        </div>
        {#if $searchInUse}
          <div id="search__results">
            {#if showResults}
              {#if $searchResults.length !== 0}
                <ResultsSection kind="article" />
                <ResultsSection kind="heading" />
                <ResultsSection kind="text" />
              {:else}
                <span id="search__errortext">
                  Es wurden keine Übereinstimmungen gefunden!
                </span>
              {/if}
            {:else}
              <span id="search__errortext">
                Bitte mindestens drei Zeichen eingeben!
              </span>
            {/if}
          </div>
        {/if}
      </div>

      {#if !$searchInUse}
        <div id="home__nav">
          <Nav menu={data.menu} />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
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

  #search__searchbar .material-icons-round {
    font-size: 20pt;
    color: var(--brandTertiaryTXT);
  }

  #search__searchbar.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  #search__results {
    height: fit-content;
    width: 80rem;
    background-color: var(--brandSecondaryBG);
    padding: 1rem 3.5rem 3.5rem 3.5rem;
    border-bottom-left-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
  }

  #search__errortext {
    color: var(--errorTXT);
  }
</style>
