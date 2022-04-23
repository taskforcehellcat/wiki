<script>
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<div id="nav__list">
  <Router {url}>
    <a href="/" class="expandable">
      <span>Grundlagen</span>
      <Link to="../allgemeines">Allgemeines</Link>
      <Link to="../funketikette">Funketikette</Link>
      <Link to="../erstehilfe">Erste Hilfe</Link>
      <Link to="../abteilungen">Abteilungen</Link>
      <Link to="../sonstiges">Sonstiges</Link>
    </a>
    <a href="/" class="expandable">
      <span>Führungskräfte</span>
      <Link to="../abteilungsleiter">Abteilungsleiter</Link>
      <Link to="../einsatzleiter">Einsatzleiter</Link>
      <Link to="../gruppentruppfuehrer">Gruppen-/Truppführer</Link>
    </a>
    <a href="/" class="expandable">
      <span>Streitkräfte</span>
      <Link to="../schuetze">Schütze</Link>
      <Link to="../funker">Funker</Link>
      <Link to="../mgschuetze">MG-Schütze</Link>
      <Link to="../atschuetze">AT-Schütze</Link>
      <Link to="../praezisionsschuetze">Präzisionsschütze</Link>
      <Link to="../breacher">Breacher</Link>
      <Link to="../grenadier">Grenadier</Link>
    </a>
    <a href="/" class="expandable">
      <span>Sanitätsdienst</span>
      <Link to="../sanitaeter">Sanitäter</Link>
      <Link to="../medevacsanitaeter">MEDEVAC-Sanitäter</Link>
    </a>
    <a href="/" class="expandable">
      <span>Panzertruppen</span>
      <Link to="../kommandant">Kommandant</Link>
      <Link to="../richtschuetze">Richtschütze</Link>
      <Link to="../fahrer">Fahrer</Link>
    </a>
    <a href="/" class="expandable">
      <span>Logistik</span>
      <Link to="../kampfpionier">Kampfpionier</Link>
      <Link to="../pionier">Pionier</Link>
      <Link to="../helikopterpilot">Helikopterpilot</Link>
      <Link to="../basislogistiker">Basislogistiker</Link>
    </a>
    <a href="/" class="expandable">
      <span>Aufklärer</span>
      <Link to="../jtac">JTAC</Link>
      <Link to="../scharfschuetze">Scharfschütze</Link>
      <Link to="../spotter">Spotter</Link>
      <Link to="../eod">EOD</Link>
    </a>
    <a href="/" class="expandable">
      <span>Fuhrpark</span>
      <Link to="../bodenfahrzeuge">Bodenfahrzeuge</Link>
      <Link to="../luftfahrzeuge">Luftfahrzeuge</Link>
    </a>
  </Router>
</div>
