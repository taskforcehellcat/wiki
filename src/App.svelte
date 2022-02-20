<script lang="ts">
  import Steuerung from "./Wiki/Steuerung.svelte";
  import Funketikette from "./Wiki/Funketikette.svelte";
  import Erstehilfe from "./Wiki/Erstehilfe.svelte";
  import Milsim from "./Wiki/Milsim.svelte";
  import Sonstiges from "./Wiki/Sonstiges.svelte";
  import Abteilungsleiter from "./Wiki/Abteilungsleiter.svelte";
  import Einsatzleiter from "./Wiki/Einsatzleiter.svelte";
  import Gruppentruppfuehrer from "./Wiki/Gruppentruppfuehrer.svelte";
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
  import Pionier from "./Wiki/Pionier.svelte";
  import Helikopterpilot from "./Wiki/Helikopterpilot.svelte";
  import Basislogistiker from "./Wiki/Basislogistiker.svelte";
  import Jtac from "./Wiki/Jtac.svelte";
  import Scharfschuetze from "./Wiki/Scharfschuetze.svelte";
  import Spotter from "./Wiki/Spotter.svelte";
  import Eod from "./Wiki/Eod.svelte";
  import Bodenfahrzeuge from "./Wiki/Bodenfahrzeuge.svelte";
  import Luftfahrzeuge from "./Wiki/Luftfahrzeuge.svelte";

  import Home from "./Home.svelte";
  import { Router, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
  <!-- Wiki Home -->
  <Route path="/"><Home /></Route>

  <!-- Wiki Pages -->
  <Route path="steuerung"><Steuerung /></Route>
  <Route path="funketikette"><Funketikette /></Route>
  <Route path="erstehilfe"><Erstehilfe /></Route>
  <Route path="milsim"><Milsim /></Route>
  <Route path="sonstiges"><Sonstiges /></Route>

  <Route path="abteilungsleiter"><Abteilungsleiter /></Route>
  <Route path="einsatzleiter"><Einsatzleiter /></Route>
  <Route path="gruppentruppfuehrer"><Gruppentruppfuehrer /></Route>

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
  <Route path="pionier"><Pionier /></Route>
  <Route path="helikopterpilot"><Helikopterpilot /></Route>
  <Route path="basislogistiker"><Basislogistiker /></Route>

  <Route path="jtac"><Jtac /></Route>
  <Route path="scharfschuetze"><Scharfschuetze /></Route>
  <Route path="spotter"><Spotter /></Route>
  <Route path="eod"><Eod /></Route>

  <Route path="bodenfahrzeuge"><Bodenfahrzeuge /></Route>
  <Route path="luftfahrzeuge"><Luftfahrzeuge /></Route>
</Router>
