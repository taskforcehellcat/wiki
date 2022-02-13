<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
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
    var resultsArr = Array.from(results);

    /* creates array from "expandable" nodelist */
    var expandableArr = Array.from(expandable);

    expandableArr.forEach((element) => {
      var open = false;

      /* adds  "arrow" to any span in "expandableArr" array */
      element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round noselect">expand_more</span>');

      /* onclick function */
      element.onclick = function (event) {
        /* disables default html click behavior */
        event.preventDefault();

        /* simple open/close toggle */
        open = !open;
        /* if collapsable menu is open, add class "open"; else remove class "open" */
        if (open == true) {
          element.classList.add("open");
        } else {
          element.classList.remove("open");
        }
      };
    });

    function isEmpty() {
      if (searchInput.value.length == 0) {
        navList.style.display = "flex";
        searchBar.style.borderBottomLeftRadius = "0.7rem";
        searchBar.style.borderBottomRightRadius = "0.7rem";
        resultBox.style.display = "none";
      } else {
        resultAmount.innerHTML = "5"; //sollte obv. noch dynamisch gemacht werden
        resultText.innerHTML = searchInput.value;
        resultBox.style.display = "block";
        searchBar.style.borderBottomLeftRadius = "0";
        searchBar.style.borderBottomRightRadius = "0";
        navList.style.display = "none";
      }
    }
    isEmpty();
    searchInput.addEventListener("input", isEmpty);
  });
</script>

<div id="home-overlay">
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>
  <div id="search-wrapper">
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
