<script>
  import Grundlagen from "./Wiki/Grundlagen.svelte";
  import Fuehrungskraefte from "./Wiki/Fuehrungskraefte.svelte";
  import Streitkraefte from "./Wiki/Streitkraefte.svelte";
  import Logistiker from "./Wiki/Logistiker.svelte";
  import Panzertruppen from "./Wiki/Panzertruppen.svelte";
  import Sanitaeter from "./Wiki/Sanitaeter.svelte";
  import Aufklaerer from "./Wiki/Aufklaerer.svelte";
  import Fuhrpark from "./Wiki/Fuhrpark.svelte";

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

  <Route path="fuhrpark"><Fuhrpark /></Route>
</Router>
