<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";

  import { searchFor } from "../public/scripts/search_backend/search.js";

  export let url = "";

  let fetchedResults; // holds output of searchFor()
  let query; // holds the query
  let showSearchResults; // whether the search bar is currently in use

  let searchResults = []; // used to generate sections in search results

  onMount(async () => {

    const expandable = document.getElementsByClassName("expandable");
    const resultBox = document.getElementById("home-nav-results");
    const searchBar = document.getElementById("home-nav-search");
    const navList = document.getElementById("home-nav-list");
    const searchInput = searchBar.querySelector("input");
    const searchWrapper = document.getElementById("search-wrapper");
    //const resultText = document.getElementById("searchtext");
    //const resultAmount = document.getElementById("resultamount");
    //const results = resultBox.querySelectorAll("li");
    //var resultsArr = Array.from(results);

    /* creates array from "expandable" nodelist */
    var expandableArr = Array.from(expandable);

    // used to track whether an expandable should open or close on a click
    let lastClicked = "";
    let toOpen = false;

    expandableArr.forEach((element) => {
      /* adds  "arrow" to any span in "expandableArr" array */
      element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round noselect">expand_more</span>');

      /* onclick function */
      element.onclick = function (event) {
        /* disables default html click behavior */
        event.preventDefault();

        // logic to determine if span should be opened
        toOpen = event.target.firstChild.textContent == lastClicked && !toOpen;
        lastClicked = event.target.firstChild.textContent;

        // collapse all
        expandableArr.forEach((element) => {
          element.classList.remove("open");
        });

        // open span if it should be open
        if (!toOpen) {
          element.classList.add("open");
        }
      };
    });

    function showResultsBox() {
      if (searchInput.value.length == 0) {
        searchWrapper.dataset.empty = "true";
      } else {
        searchWrapper.dataset.empty = "false";
        resultAmount.innerHTML = "5"; //sollte obv. noch dynamisch gemacht werden
        resultText.innerHTML = searchInput.value;
        //resultAmount.innerHTML = "5"; //sollte obv. noch dynamisch gemacht werden
        //resultText.innerHTML = searchInput.value;
        resultBox.style.display = "block";
        searchBar.style.borderBottomLeftRadius = "0";
        searchBar.style.borderBottomRightRadius = "0";
        navList.style.display = "none";
      }
    }

    showResultsBox();
    searchInput.addEventListener("input", showResultsBox);
  });

  const handleQuery = (e) => {
    query = e.target.value;
    fetchedResults = searchFor(query); 

    showSearchResults = query.length > 2; // if some character was typed at all

    if (fetchedResults.length !== 0) {

      if (query.length > 2) {
        
        // organize results
        searchResults = [{title: fetchedResults[0][0], hits: 0}]; // initialisation


        // add page hits
        let pageIndex = 0;
        fetchedResults.forEach(element => {
          if (searchResults[pageIndex].title === element[0]) {
            searchResults[pageIndex].hits += 1;
          } else {
            searchResults.push({title: element[0], hits: 1});
            pageIndex += 1;
          }
        });

        // add section hits
        searchResults.forEach(result => {
          
          var secResultsArr = [] // to be appended later
          
          // get all hits on this page from fetched results
          var hitsOnPage = fetchedResults.filter(r => {
            return r[0] === result.title
          });

          hitsOnPage.forEach(hit => {
            secResultsArr.push({
              title: hit[1],
              link: '/', // TODO
              env: hit[2]
            });
          });

          result.secResults = secResultsArr;
        
        });
          
      } else {
        // if query is not longer than 2 chars, clear previous results.
        searchResults = [];
      }

    } else {
      searchResults = [];
    }
  }

</script>

<div id="home-overlay">
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>
  <div id="search-wrapper" data-empty="true">
    <div id="home-nav-search">
      <span class="material-icons noselect">search</span>
      <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery}/>
    </div>
    <div id="home-nav-results">
      {#if showSearchResults}
        {#if searchResults.length !== 0}
          {#each searchResults as page} 
            <p><span class="searchPageHits">{page.hits}</span> Treffer auf "<span class="searchPageTitle">{page.title}</span>" gefunden:</p>
            <ol>
              <Router>
                {#each page.secResults as sechit}
                <li><span class="searchenv">"{sechit.env}" <span class="noselect">&rarr; </span></span><Link to="{sechit.link}">"{sechit.title}"</Link></li>
                {/each}
              </Router>
            </ol>
          {/each}
        {:else}
          <p><sp id="searcherrortext">Es wurden keine Übereinstimmungen gefunden!</sp></p>
        {/if}
      {:else} 
        <p><span id="searcherrortext">Bitte mindestens drei Zeichen eingeben!</span></p>
      {/if}
    </div>
  </div>

  <!-- wär cool wenn das expand ding automatisch geht mit einer "expandable" klasse oder so :) -->

  <div id="home-nav-list">
    <Router {url}>
      <a href="/" class="expandable">
        <span>grundlagen</span>
        <Link to="steuerung">steuerung</Link>
        <Link to="funk">funk</Link>
        <Link to="erstehilfe">erste hilfe</Link>
        <Link to="buddyteam">buddyteam</Link>
        <Link to="sonstiges">sonstiges</Link>
      </a>
      <a href="/" class="expandable">
        <span>führungskräfte</span>
        <Link to="abteilungsleiter">abteilungsleiter</Link>
        <Link to="einsatzleiter">einsatzleiter</Link>
        <Link to="gruppentruppfuehrer">gruppen-/truppführer</Link>
      </a>
      <a href="/" class="expandable">
        <span>streitkräfte</span>
        <Link to="schuetze">schütze</Link>
        <Link to="funker">funker</Link>
        <Link to="mgschuetze">mgschütze</Link>
        <Link to="atschuetze">atschütze</Link>
        <Link to="praezisionsschuetze">präzisionsschütze</Link>
        <Link to="breacher">breacher</Link>
        <Link to="grenadier">grenadier</Link>
      </a>
      <a href="/" class="expandable">
        <span>sanitätsdienst</span>
        <Link to="sanitaeter">sanitäter</Link>
        <Link to="medevacsanitaeter">medevac-sanitäter</Link>
      </a>
      <a href="/" class="expandable">
        <span>panzertruppen</span>
        <Link to="fahrer">fahrer</Link>
        <Link to="kommandant">kommandant</Link>
        <Link to="richtschuetze">richtschütze</Link>
        <Link to="ladeschuetze">ladeschütze</Link>
      </a>
      <a href="/" class="expandable">
        <span>logistik</span>
        <Link to="kampfpionier">kampfpionier</Link>
        <Link to="pionier">pionier</Link>
        <Link to="helikopterpilot">helikopterpilot</Link>
        <Link to="basislogistiker">basislogistiker</Link>
      </a>
      <a href="/" class="expandable">
        <span>aufklärer</span>
        <Link to="jtac">jtac</Link>
        <Link to="scharfschuetze">scharfschütze</Link>
        <Link to="spotter">spotter</Link>
        <Link to="eod">eod</Link>
      </a>
      <a href="/" class="expandable">
        <span>fuhrpark</span>
        <Link to="bodenfahrzeuge">bodenfahrzeuge</Link>
        <Link to="luftfahrzeuge">luftfahrzeuge</Link>
      </a>
    </Router>
  </div>
</div>
