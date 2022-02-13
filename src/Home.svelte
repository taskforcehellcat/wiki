<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { element } from "svelte/internal";
  export let url = "";

  onMount(async () => {
    const expandable = document.getElementsByClassName("expandable");
    const resultBox = document.getElementById("home-nav-results");
    const searchBar = document.getElementById("home-nav-search");
    const navList = document.getElementById("home-nav-list");
    const searchInput = searchBar.querySelector("input");
    const resultText = document.getElementById("searchtext");
    const resultAmount = document.getElementById("resultamount");
    const results = resultBox.querySelectorAll("li");
    const searchWrapper = document.getElementById("search-wrapper");
    var resultsArr = Array.from(results);

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

    function isEmpty() {
      if (searchInput.value.length == 0) {
        searchWrapper.dataset.empty = "true";
      } else {
        searchWrapper.dataset.empty = "false";
        resultAmount.innerHTML = "5"; //sollte obv. noch dynamisch gemacht werden
        resultText.innerHTML = searchInput.value;
      }
    }
    isEmpty();
    searchInput.addEventListener("input", isEmpty);
  });
</script>

<div id="home-overlay">
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>
  <div id="search-wrapper" data-empty="true">
    <div id="home-nav-search">
      <span class="material-icons noselect">search</span>
      <input type="text" name="search" placeholder="Wiki durchsuchen..." />
    </div>
    <div id="home-nav-results">
      <p><span id="resultamount" /> Treffer auf "<span id="searchtext" />" gefunden:</p>
      <!-- nur als platzhalter: -->
      <ol>
        <Router>
          <li><span class="searchenv">"..Lorem ipsum dolor sit amet consectetur adipisicing elit ..." <span class="noselect">&rarr; </span></span><Link to="/">"Bla"</Link></li>
          <li><span class="searchenv">"..Lorem ipsum dolor sit amet consectetur adipisicing elit ..." <span class="noselect">&rarr; </span></span><Link to="/">"Bla"</Link></li>
          <li><span class="searchenv">"..Lorem ipsum dolor sit amet consectetur adipisicing elit ..." <span class="noselect">&rarr; </span></span><Link to="/">"Bla"</Link></li>
          <li><span class="searchenv">"..Lorem ipsum dolor sit amet consectetur adipisicing elit ..." <span class="noselect">&rarr; </span></span><Link to="/">"Bla"</Link></li>
          <li><span class="searchenv">"..Lorem ipsum dolor sit amet consectetur adipisicing elit ..." <span class="noselect">&rarr; </span></span><Link to="/">"Bla"</Link></li>
        </Router>
      </ol>
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
