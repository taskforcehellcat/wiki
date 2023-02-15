<!-- Homepage -->
<script lang="ts">
  import '../app.scss';
  import Theme from '$lib/theme/Theme.svelte';
  import Nav from '$lib/nav/Nav.svelte';
  import { themeId } from '$lib/theme/stores';

  import { directSearch, textSearch } from '$lib/search/search';

  import { Search } from '$lib/search/engine';

  import index from '$lib/search/index.json';

  import ResultsSection from '$lib/search/ResultsSection.svelte';
  let search = new Search(index);

  console.debug(index);

  let query = ''; // holds the query
  let showResults = false; // whether the search bar is currently in use
  //let textResults = []; // used to generate sections in search results
  //let directResults = [];
  let searchResults = [];

  const handleQuery = (e) => {
    query = e.target.value;

    let searchInUse = query.length !== 0;

    // do the styling
    // hide results box if search bar empty
    document.getElementById('search').dataset.empty = (!searchInUse).toString();

    // show dropdown link menues if search bar empty
    document.getElementById('nav__list').style.display = searchInUse ? 'none' : 'flex';

    showResults = query.length > 2;

    if (query.length > 2) {
      //textResults = textSearch(query);
      //directResults = directSearch(query);

      //console.debug(search.query(query));

      searchResults = search.query(query);

      /* REMOVE ME c: */
      searchResults = [
        {
          type: 'page',
          breadcrumbs: [
            { link: 'testcat', display: 'Testcat 1' },
            { link: 'testcat/textart', display: 'Testart 1' }
          ]
        },
        {
          type: 'page',
          breadcrumbs: [
            { link: 'testcat', display: 'Testcat 1' },
            { link: 'testcat/textart3', display: 'Testart 3' }
          ]
        },
        {
          type: 'page',
          breadcrumbs: [
            { link: 'testcat2', display: 'Testcat 2' },
            { link: 'testcat2/textart2', display: 'Testart 2' }
          ]
        },
        {
          type: 'heading',
          breadcrumbs: [
            { link: 'testcat', display: 'Testcat 1' },
            { link: 'testcat/textart', display: 'Testart 1' },
            { link: 'testcat/textart#heading', display: 'Überschrift 1' }
          ]
        }
      ];
    }
  };

  export let data;
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
        <img id="home__nav__logo" class="noselect" src="/images/tfhcwiki_full.svg" alt="Task Force Hellcat Logo" />
      </div>

      <!-- search bar -->
      <div id="search" data-empty="true">
        <div id="search__searchbar">
          <span class="material-icons noselect">search</span>
          <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery} />
        </div>
        <div id="search__results">
          {#if showResults}
            {#if searchResults.length !== 0}
              <div class="grid-container">
                <ResultsSection results={searchResults} kind="page" />
                <ResultsSection results={searchResults} kind="heading" />
                <ResultsSection results={searchResults} kind="text" />
              </div>
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

  .grid-container {
    display: grid;
    gap: 5px;
    grid-template-columns: 30px auto;
  }
</style>
