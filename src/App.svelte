<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import Wiki from "./Wiki.svelte";
	import Gallery from "./Gallery.svelte";
	import Contact from "./Contact.svelte";
	import Mlg from "./Mlg.svelte";

	export let url = "";

</script>


<main>
	<div id="navigation">
		<Router url="{url}">

			<!-- <Link to="/" getProps="{getProps}"> -->

			<Link to="/" class="nav-gridcell highlight-anim highlight-anim-blue">
				<span class="material-icons">home</span><span class="text">home</span>
			</Link>
			<Link to="wiki" class="nav-gridcell highlight-anim highlight-anim-green">
				<span class="material-icons">book</span><span class="text">wiki</span>
			</Link>
			<Link to="/">
				<img alt="hellcat logo" src="./images/hellcat.png" id="nav-logo" class="nointeract">
			</Link>

			<Link to="gallery" class="nav-gridcell highlight-anim highlight-anim-orange">
				<span class="material-icons">collections</span><span class="text">gallerie</span>
			</Link>
			<Link to="contact" class="nav-gridcell highlight-anim highlight-anim-purple">
				<span class="material-icons">alternate_email</span><span class="text">kontakt</span>
			</Link>
		</Router>
	</div>

	<div id="logo-title" class="nointeract">Task Force Hellcat</div>
	
	<Router url="{url}">
		<Route path="mlg" component="{Mlg}" />
		<Route path="contact" component="{Contact}" />
		<Route path="gallery" component="{Gallery}" />
		<Route path="wiki" component="{Wiki}" />
		<Route path="/"><Home /></Route>
	</Router>
</main>
<footer>
	<div>
		<a title="Visit our ArmA 3 Units Profile!" href="https://units.arma3.com/" target="_blank">
			<div>
				<img alt="arma units logo" src="https://units.arma3.com/assets/img/units/header_icon.png">
			</div>
		</a>
		<a title="Join our Discord!" href="https://discord.gg/Ap3bEmBgXw" target="_blank">
			<div>
				<img alt="discord logo" src="./images/discord.svg">
			</div>
		</a>
	</div>
	<span>&copy; Task Force Hellcat<br><span>All rights reserverd.</span></span>
</footer>

<style>
</style>