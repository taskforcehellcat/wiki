<style>
</style>

<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  export let url = "";

  onMount(async () => {
    const expandable = document.getElementsByClassName("expandable");
    var expandableArr = Array.from(expandable);

    expandableArr.forEach((element) => {
      var open = false;
      element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round">expand_more</span>');
      element.onclick = function (event) {
        event.preventDefault();
        open = !open;
        if (open == true) {
          element.querySelector(".material-icons-round").style.transform = "rotate(90deg)";
          element.querySelectorAll("a").forEach((element) => {
            element.style.display = "flex";
          });
        } else {
          element.querySelector(".material-icons-round").style.transform = "rotate(0deg)";
          element.querySelectorAll("a").forEach((element) => {
            element.style.display = "none";
          });
        }
      };
    });
  });
</script>

<div id="home-overlay">
  <div id="home-nav-logo">Task Force Hellcat <br /><span>Wiki</span></div>
  <div id="home-nav-search">
    <span class="material-icons">search</span>
    <input type="text" name="search" placeholder="Wiki durchsuchen..." />
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
