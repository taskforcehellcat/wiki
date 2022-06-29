<script lang="ts">
  import Allgemeines from "./Wiki/Allgemeines.svelte";
  import Funketikette from "./Wiki/Funketikette.svelte";
  import Erstehilfe from "./Wiki/Erstehilfe.svelte";
  import Abteilungen from "./Wiki/Abteilungen.svelte";
  import Sonstiges from "./Wiki/Sonstiges.svelte";
  import Befehlsausgabe from "./Wiki/Befehlsausgabe.svelte";
  import Schuetze from "./Wiki/Schuetze.svelte";
  import Funker from "./Wiki/Funker.svelte";
  import Mgschuetze from "./Wiki/Mgschuetze.svelte";
  import Atschuetze from "./Wiki/Atschuetze.svelte";
  import Praezisionsschuetze from "./Wiki/Praezisionsschuetze.svelte";
  import Breacher from "./Wiki/Breacher.svelte";
  import Grenadier from "./Wiki/Grenadier.svelte";
  import Sanitaeter from "./Wiki/Sanitaeter.svelte";
  import Medevacsanitaeter from "./Wiki/Medevacsanitaeter.svelte";
  import Fahrer from "./Wiki/Fahrer.svelte";
  import Kommandant from "./Wiki/Kommandant.svelte";
  import Richtschuetze from "./Wiki/Richtschuetze.svelte";
  import Kampfpionier from "./Wiki/Kampfpionier.svelte";
  import Helikopterpilot from "./Wiki/Helikopterpilot.svelte";
  import Jtac from "./Wiki/Jtac.svelte";
  import Scharfschuetze from "./Wiki/Scharfschuetze.svelte";
  import Spotter from "./Wiki/Spotter.svelte";
  import Eod from "./Wiki/Eod.svelte";
  import Bodenfahrzeuge from "./Wiki/Bodenfahrzeuge.svelte";
  import Luftfahrzeuge from "./Wiki/Luftfahrzeuge.svelte";
  import Steuerung from "./Wiki/Steuerung.svelte";
  import Truppenteile from "./Wiki/Truppenteile.svelte";

  import Home from "./Home.svelte";
  import { Router, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
  <!-- Wiki Home -->
  <Route path="/"><Home /></Route>

  <!-- Wiki Pages -->
  <Route path="allgemeines"><Allgemeines /></Route>
  <Route path="funketikette"><Funketikette /></Route>
  <Route path="erstehilfe"><Erstehilfe /></Route>
  <Route path="abteilungen"><Abteilungen /></Route>
  <Route path="sonstiges"><Sonstiges /></Route>

  <Route path="befehlsausgabe"><Befehlsausgabe /></Route>
  <Route path="steuerung"><Steuerung /></Route>
  <Route path="truppenteile"><Truppenteile /></Route>

  <Route path="schuetze"><Schuetze /></Route>
  <Route path="funker"><Funker /></Route>
  <Route path="mgschuetze"><Mgschuetze /></Route>
  <Route path="atschuetze"><Atschuetze /></Route>
  <Route path="praezisionsschuetze"><Praezisionsschuetze /></Route>
  <Route path="breacher"><Breacher /></Route>
  <Route path="grenadier"><Grenadier /></Route>

  <Route path="sanitaeter"><Sanitaeter /></Route>
  <Route path="medevacsanitaeter"><Medevacsanitaeter /></Route>

  <Route path="fahrer"><Fahrer /></Route>
  <Route path="kommandant"><Kommandant /></Route>
  <Route path="richtschuetze"><Richtschuetze /></Route>

  <Route path="kampfpionier"><Kampfpionier /></Route>
  <Route path="helikopterpilot"><Helikopterpilot /></Route>

  <Route path="jtac"><Jtac /></Route>
  <Route path="scharfschuetze"><Scharfschuetze /></Route>
  <Route path="spotter"><Spotter /></Route>
  <Route path="eod"><Eod /></Route>

  <Route path="bodenfahrzeuge"><Bodenfahrzeuge /></Route>
  <Route path="luftfahrzeuge"><Luftfahrzeuge /></Route>
</Router>
