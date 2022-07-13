<!-- <script lang="ts"></script> -->
<script>
	import Wipbanner from '$lib/wipbanner/wipbanner.svelte';
	var editdate;

	let anchors = [];

	// --- themes ---
	import Theme from '$lib/theme/Theme.svelte';

	// --- burger menu ---

	import { toggleBurgerIcon, toggleBurgerMenu } from '$lib/burgermenu/burgermenu.svelte';

	var menuOpen;
	var menuClose;
	var main;
	var burgerMenu;
	var hideBurgerMenu;

	// --- search bar functionality ---

	import { searchFor, updateSearchResults } from '$lib/search/search.js';

	let query = '';
	let showResults = false;
	let searchResults = [];

	// ---

	import { onMount } from 'svelte';
	import { includeDropDown } from '$lib/nav/nav.js';
	import Nav from '$lib/nav/nav.svelte';

	onMount(async () => {
		includeDropDown();
		// create nodelists of sections
		const H2sections = document.querySelectorAll('section[id]:not(section > section)');

		toggleBurgerIcon();
		// create arrays from nodelists
		var h2SectionsArr = Array.from(H2sections);

		let tempAnchors = [];

		// for every element of the "h2SectionsArr" array
		h2SectionsArr.forEach((element) => {
			// add h2 tag with element's id as content
			element.insertAdjacentHTML('afterbegin', '<h2>' + element.id + '</h2>');
			tempAnchors.push({
				text: element.id,
				link: '#' + element.id
			});
		});

		anchors = tempAnchors;
	});

	const handleQuery = (e) => {
		query = e.target.value;

		let searchInUse = query.length !== 0;

		// do the styling
		// hide results box if search bar empty
		document.getElementById('search').style.display = searchInUse ? 'block' : 'none';

		// @Fenres Rest der Naviagtion verstecken, wenn gesucht wird?

		// document.getElementById("nav__list").style.display = searchInUse ? "none" : "flex";

		if (query.length > 2) {
			showResults = true;
		} else {
			showResults = false;
		}

		console.debug(showResults);

		searchResults = updateSearchResults(query);
		console.debug(searchResults);
	};
</script>

<svelte:window on:load={toggleBurgerIcon} on:resize={toggleBurgerIcon} />

<div id="wiki">
	<nav>
		<a href="/" id="nav__logo" on:click={hideBurgerMenu}>TFHC <span>Wiki</span></a>

		<button id="burgerMenu" bind:this={burgerMenu} on:click={toggleBurgerMenu}>
			<svg
				id="menuOpen"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 400 398"
				fill="#fff"
				bind:this={menuOpen}
				><g transform="translate(-1321 -509)"
					><rect width="400" height="78" transform="translate(1321 509)" /><rect
						width="400"
						height="78"
						transform="translate(1321 668)"
					/><rect width="400" height="78" transform="translate(1321 829)" /></g
				></svg
			>

			<svg
				id="menuClose"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 338 338"
				fill="#fff"
				bind:this={menuClose}
				><g transform="translate(-1355.001 -567.001)"
					><rect width="400" height="78" transform="translate(1410.156 567.001) rotate(45)" /><rect
						width="400"
						height="78"
						transform="translate(1355.001 849.844) rotate(-45)"
					/></g
				></svg
			>
		</button>

		<!-- search bar -->
		<!--
      <div id="search" dataset-empty="true">
        <div id="nav__search">
          <span class="material-icons">search</span>
          <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery} />
        </div>
      
  
        <div id="nav__search-results">
          {#if showResults}
            {#if searchResults.length !== 0}
              <!- - Hier restliche Logik, erstmal nur Fehlertext zu Testzwecken - ->
              <p><span>Suchergebnisse</span></p>
            {:else}
              <p><span id="search__errortext">Es wurden keine Übereinstimmungen gefunden!</span></p>
            {/if}
          {:else}
            <!- - <p><span id="search__errortext">Diggi drei Zeichen oder DDoS.</span></p> - ->
          {/if}
        </div>
      </div>
    -->

		<!-- navigation items -->
		<div class="nav__list-title">navigation</div>
		<div id="nav__list-wrapper">
			<div id="nav__list-bar">
				<!-- <div id="nav__list-bar-thumb" /> -->
			</div>

			<div id="wiki-nav__list">
				{#each anchors as anchor}
					<a href={anchor.link}>{anchor.text}</a>
				{/each}
			</div>
		</div>
		<div class="nav__list-title">wiki</div>
		<Nav />
		<a href="/" id="return-button">Zurück</a>
	</nav>

	<div id="overlay">
		{#each anchors as anchor}
			<a on:click={toggleBurgerMenu} href={anchor.link}>{anchor.text}</a>
		{/each}
	</div>

	<main id="main" bind:this={main}>
		<Wipbanner />
		<Theme />
		<slot name="content" />
	</main>
	<footer>zuletzt bearbeitet am: <slot name="editdate" /></footer>
</div>

<style>
	#wiki {
		min-height: 120vh;
		display: grid;
		grid-template-columns: 38rem 4fr;
		grid-template-rows: 18fr 12rem;
	}
	#nav__list-bar {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.nav__list-title {
		color: var(--brandNeutral);
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.1rem;
		margin-bottom: -2rem;
	}

	#nav__list-wrapper {
		display: flex;
		gap: 15px;
		height: fit-content;
		box-sizing: unset;
	}

	#nav__list-bar {
		width: 3px;
		background-color: var(--brandSecondaryBG);
		/* background-color: red; */
		height: 100%;
		border-radius: 0.2rem;
		-webkit-border-radius: 0.2rem;
		-moz-border-radius: 0.2rem;
		-ms-border-radius: 0.2rem;
		-o-border-radius: 0.2rem;
	}

	#wiki-nav__list {
		display: flex;
		gap: 20px;
		flex-direction: column;
		justify-content: space-around;
		padding: 0.8rem 0 0.8rem 0;
	}

	nav {
		height: 100vh;
		background-color: var(--brandPrimaryBG);
		display: flex;
		color: var(--brandSecondaryTXT);
		flex-direction: column;
		padding: 10%;
		gap: 3rem;
		position: sticky;
		z-index: 99;
		top: 0;
		overflow-y: auto;
	}

	nav::-webkit-scrollbar {
		display: none;
	}

	@media only screen and (max-width: 800px) {
		.nav__list-title,
		#nav__list-wrapper {
			display: none;
		}

		nav {
			height: 100%;
			flex-direction: initial;
			align-items: center;
			padding: 0 4rem 0 4rem;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			justify-content: space-between;
		}
	}
</style>
