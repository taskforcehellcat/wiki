<script>
	import Template from "./Template.svelte";
	import Template_nav from "./Template_nav.svelte";
	import Template_img from "./Template_img.svelte";

</script>


	<nav>
		<div id="nav-logo">TFHC <span>Wiki</span></div>
		<div id="nav-search">
			<span class="material-icons">search</span>
			<input type="text" name="search" placeholder="Wiki durchsuchen...">
			
		</div>
		
		
		<div id="nav-list-title">navigation</div>
		<div id="nav-list-wrapper">
			<div id="nav-list-bar">
				<div id="nav-list-bar-thumb">
				</div>
			</div>
		<div id="nav-list">
			<a href="./#">Allgemeines</a>
			<a href="#heading2">Rollenprofil</a>
			<a href="#heading3">Ausrüstung</a>
			<a href="#heading4">Aufgabenbereiche</a>
			<a href="#heading5">Einsatzgebiete</a>
			<a href="#heading6">Kompetenzen</a>
			<a href="#heading7">Ausbildungsgehalt</a>
			<a href="#heading8">Kanonenfuttergrad</a>
		</div>
		</div>
		<div id="return-button">
			Return
		</div>
	</nav>

	<main>
		<Template />
	</main>
	






<footer>

</footer>



<style>
</style>