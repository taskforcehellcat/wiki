<script>
  import Grundlagen from "./Wiki/Grundlagen.svelte";
  import Panzertruppen from "./Wiki/Panzertruppen.svelte";
  import Sanitaeter from "./Wiki/Sanitaeter.svelte";
  import Aufklaerer from "./Wiki/Aufklaerer.svelte";

  import Basislogistiker from "./Wiki/Basislogistiker.svelte";
  import Fahrzeuge from "./Wiki/Fahrzeuge.svelte";
  import Fusstruppen from "./Wiki/Fusstruppen.svelte";
  import Helikopter from "./Wiki/Helikopter.svelte";
  import Hubschrauberpiloten from "./Wiki/Hubschrauberpiloten.svelte";
  import Kampfpioniere from "./Wiki/Kampfpioniere.svelte";
  import Truppfuehrer from "./Wiki/Truppfuehrer.svelte";
  import Truppfunker from "./Wiki/Truppfunker.svelte";
  import Uavs from "./Wiki/Uavs.svelte";

  import Home from "./Home.svelte";
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<!--
<Wiki/>
-->

<Router {url}>
  <Route path="/"><Home /></Route>
  <Route path="grundlagen"><Grundlagen /></Route>
  <Route path="fuehrungskraefte"><Fuehrungskraefte /></Route>
  <Route path="streitkraefte"><Streitkraefte /></Route>
  <Route path="logistiker"><Logistiker /></Route>
  <Route path="panzertruppen"><Panzertruppen /></Route>
  <Route path="sanitaeter"><Sanitaeter /></Route>
  <Route path="aufklaerer"><Aufklaerer /></Route>

  <Route path="basis-logistiker"><Basislogistiker /></Route>
  <Route path="fahrzeuge"><Fahrzeuge /></Route>
  <Route path="fusstruppen"><Fusstruppen /></Route>
  <Route path="helikopter"><Helikopter /></Route>
  <Route path="hubschrauberpiloten"><Hubschrauberpiloten /></Route>
  <Route path="kampfpioniere"><Kampfpioniere /></Route>
  <Route path="truppfuehrer"><Truppfuehrer /></Route>
  <Route path="truppfunker"><Truppfunker /></Route>
  <Route path="uavs"><Uavs /></Route>

  <Route path="fuhrpark"><Fuhrpark /></Route>
</Router>
