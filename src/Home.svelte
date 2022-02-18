<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Nav from "./Nav.svelte";

  import { searchFor, updateSearchResults } from "../public/scripts/search_backend/search.js";

  let query = ""; // holds the query
  let showResults = false; // whether the search bar is currently in use
  let searchResults = []; // used to generate sections in search results

  import { includeDropDown } from "../public/scripts/navigation/nav.js";

  onMount(async () => {
    includeDropDown(); // expandables
  });

  const handleQuery = (e) => {
    query = e.target.value;

    let searchInUse = query.length !== 0;

    // do the styling
    // hide results box if search bar empty
    document.getElementById("search-wrapper").dataset.empty = !searchInUse;

    // show dropdown link menues if search bar empty
    document.getElementById("nav-list").style.display = searchInUse ? "none" : "flex";

    if (query.length > 2) {
      showResults = true;
    } else {
      showResults = false;
    }

    searchResults = updateSearchResults(query);
  };
</script>

<div id="home-overlay">
  <a id="home-link" href="https://taskforcehellcat.tk/"
    ><span class="material-icons"> chevron_left </span>
    Zurück zur Hauptseite</a
  >
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>

  <!-- search bar -->
  <div id="search-wrapper" data-empty="true">
    <div id="home-nav-search">
      <span class="material-icons noselect">search</span>
      <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery} />
    </div>
    <div id="home-nav-results">
      {#if showResults}
        {#if searchResults.length !== 0}
          {#each searchResults as page}
            <p><span class="searchPageHits">{page.hits}</span> Treffer auf "<Link class="searchPageTitle" to={page.secResults[0].link}>{page.title}</Link>" gefunden:</p>
            <ol>
              <Router>
                {#each page.secResults as sechit}
                  <li><span class="searchenv">"{sechit.env}" <span class="noselect">&#x21aa; </span></span>"<Link to={"/" + sechit.link + "#" + sechit.title}>{sechit.title}</Link>"</li>
                {/each}
              </Router>
            </ol>
          {/each}
        {:else}
          <p><span class="searcherrortext">Es wurden keine Übereinstimmungen gefunden!</span></p>
        {/if}
      {:else}
        <p><span class="searcherrortext">Bitte mindestens drei Zeichen eingeben!</span></p>
      {/if}
    </div>
  </div>
  <div id="home-nav"><Nav /></div>
</div>
