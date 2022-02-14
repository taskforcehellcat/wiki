<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Nav from "./Nav.svelte";

  import { searchFor } from "../public/scripts/search_backend/search.js";

  let fetchedResults = []; // holds output of searchFor()
  let query = ''; // holds the query
  let showResultsBox = false; // whether the search bar is currently in use

  let searchResults = []; // used to generate sections in search results
  import { dropDown } from "../public/scripts/navigation/nav.js";
  
  onMount(async () => {
    const resultBox = document.getElementById("home-nav-results");
    const searchBar = document.getElementById("home-nav-search");
    const navList = document.getElementById("nav-list");
    const searchInput = searchBar.querySelector("input");
    const searchWrapper = document.getElementById("search-wrapper");

    dropDown(); // expandables

    function showResultsBox() {
      // if search bar is empty,
      if (searchInput.value.length == 0) {
        // set searchwrapper dataset "empty" to "true"
        searchWrapper.dataset.empty = "true";
        // show navigation links
        navList.style.display = "flex";
        // if search bar is not empty,
      } else {
        // set searchwrapper dataset "empty" to "false"
        searchWrapper.dataset.empty = "false";
        // set hide navigation links
        navList.style.display = "none";
      }
    }

    showResultsBox();
    searchInput.addEventListener("input", showResultsBox);
  });

  const handleQuery = (e) => {
    query = e.target.value;

    if (query.length > 2) {
      fetchedResults = searchFor(query);
      showResultsBox = true;
    } else {
      showResultsBox = false;
    }

    if (fetchedResults.length !== 0) {
      if (query.length > 2) {
        // organize results
        searchResults = [{ title: fetchedResults[0][0], hits: 0 }]; // initialisation

        // add page hits
        let pageIndex = 0;
        fetchedResults.forEach((element) => {
          if (searchResults[pageIndex].title === element[0]) {
            searchResults[pageIndex].hits += 1;
          } else {
            searchResults.push({ title: element[0], hits: 1 });
            pageIndex += 1;
          }
        });

        // add section hits
        searchResults.forEach((result) => {   

          var secResultsArr = []; // to be appended later

          // get all hits on this page from fetched results
          var hitsOnPage = fetchedResults.filter((r) => {
            return r[0] === result.title;
          });

          hitsOnPage.forEach((hit) => {
            secResultsArr.push({
              title: hit[1],
              link: hit[3],
              env: hit[2],
            });
          });

          result.secResults = secResultsArr;
        });
      }
    } else {
      searchResults = [];
    }
  };
</script>

<div id="home-overlay">
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>
  <div id="search-wrapper" data-empty="true">
    <div id="home-nav-search">
      <span class="material-icons noselect">search</span>
      <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery} />
    </div>
    <div id="home-nav-results">
      {#if showResultsBox}
        {#if searchResults.length !== 0}
          {#each searchResults as page}
            <p><span class="searchPageHits">{page.hits}</span> Treffer auf "<Link class="searchPageTitle" to={page.secResults[0].link}>{page.title}</Link>" gefunden:</p>
            <ol>
              <Router>
                {#each page.secResults as sechit}
                  <li><span class="searchenv">"{sechit.env}" <span class="noselect">&#x21aa; </span></span>"<Link to={'/'+sechit.link+'#'+sechit.title}>{sechit.title}</Link>"</li>
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

  <!-- wär cool wenn das expand ding automatisch geht mit einer "expandable" klasse oder so :) -->
</div>
