<script>
	import Template from "./Template.svelte";
	import Template_nav from "./Template_nav.svelte";
	import Template_img from "./Template_img.svelte";

</script>


<header>
	<div>
		<a href="/"><span class="material-icons">arrow_back_ios_new</span>back to homepage</a>
	</div>

	<div id="searcharea">
		<span id="searchbar">Suchen...</span><span class="material-icons icon-big">search</span>
	</div>
</header>

<main>
	<!-- Left Column (Logo & Article Navigation) -->
	<div id="left-bar">
		<div id="wiki-logo"><img alt="Task Force Hellcat Wiki" src="./img/tfhc wiki logo clean.png"></div>
		<div id="article-nav">
			<div>contents</div>
			<Template_nav/>
		</div>
	</div>
	<!-- Center Column (Main Content) -->
	<div id="content">
		<Template/>
	</div>
	<!-- Placeholder for now -->
	<div id="right-bar">
		<Template_img/>
	</div>
</main>

<footer></footer>



<style>
</style>