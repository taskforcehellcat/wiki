<script>
	import { onMount } from 'svelte';
	import Template from "./Template.svelte";
	import Template_nav from "./Template_nav.svelte";
	import Template_img from "./Template_img.svelte";

	onMount(() => {
		const thumb = document.getElementById("nav-list-bar-thumb");


		const array = ["one", "two", "three"];
		const sectionAmount = document.querySelectorAll("section");
		const a = document.createElement("a");
		const navList = document.getElementById('nav-list');

		// sleep function
		function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
		}




		for (let i = 0; i < sectionAmount.length; i++) {
			navList.innerHTML += '<a href="#">link</a>'
		}
		
		sleep(5000).then(() => {
			thumb.style.height = 1 / sectionAmount.length * 100 + "%";
		});
		

		
	});
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
		</div>
		</div>
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