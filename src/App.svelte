<script>
	import { onMount } from 'svelte';
	import Template from "./Template.svelte";
	import Template_nav from "./Template_nav.svelte";
	import Template_img from "./Template_img.svelte";
import { element } from 'svelte/internal';

	onMount(() => {

		const thumb = document.getElementById("nav-list-bar-thumb");
		const sections = document.querySelectorAll("section");
		const navList = document.getElementById('nav-list');
		var sectionsArr = [];
		var x = 1;

		/* Konvertiert "Sections" NodeList zu Array (falls man's mal brauch x) */
		for(var i = sections.length; i--; sectionsArr.unshift(sections[i]));

		/* Fügt h2 zu allen elementen der NodeList */
		sectionsArr.forEach(element=> {
			element.insertAdjacentHTML("afterBegin", "<h2>" + element.id + "</h2>");
			navList.innerHTML += '<a href="#' + element.id + '">' + element.id + '</a>';
		});
		
		/* setzt nav-list-bar-thumb auf genaue höhe von einem navi punkt */
		thumb.style.height = 1 / sections.length * 100 + "%";

		
	});
</script>


	<nav>
		<div id="nav-logo">TFHC <span>Wiki</span></div>
		<div id="nav-search">
			<span class="material-icons">search</span>
			<input type="text" name="search" placeholder="Wiki durchsuchen...">
			
		</div>
		
		
		<div class="nav-list-title">navigation</div>
		<div id="nav-list-wrapper">
			<div id="nav-list-bar">
				<div id="nav-list-bar-thumb">
				</div>
			</div>
		<div id="nav-list">
		</div>
		</div>
		<div class="nav-list-title">wiki</div>
		<a id="return-button">
			Return
		</a>
	</nav>

	<main>
		<Template />
	</main>
	






<footer>

</footer>



<style>
</style>