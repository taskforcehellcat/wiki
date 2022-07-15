<!-- <script lang="ts"></script> -->
<script>
	import Wipbanner from '$lib/wipbanner/wipbanner.svelte';
	// --- themes ---
	import Theme from '$lib/theme/Theme.svelte';

	// --- burger menu ---
	import OpenMenuSVG from '$lib/burgermenu/openMenu.svelte';
	import CloseMenuSVG from '$lib/burgermenu/closeMenu.svelte';
	import { updateSearchResults } from '$lib/search/search';
	import { onMount } from 'svelte';
	import Nav from '$lib/nav/Nav.svelte';

	let editdate;
	let isOpen = false;
	let anchors = [];

	// --- search bar functionality ---

	let query = '';
	let showResults = false;
	let searchResults = [];

	// ---

	let H2sections;
	let H3sections;
	let H4sections;

	function collectSections() {
		H2sections = document.querySelectorAll('section[id]:not(section > section)');
		H3sections = document.querySelectorAll('section > section[id]');
		H4sections = document.querySelectorAll('section > section > section[id]');
	}

	onMount(async () => {
		collectSections();

		const H2sectionsArr = Array.from(H2sections);
		const H3sectionsArr = Array.from(H3sections);
		const H4sectionsArr = Array.from(H4sections);

		let tempAnchors = [];

		// for every element of the "H2sectionsArr" array
		H2sectionsArr.forEach((element) => {
			// add h2 tag with element's id as content
			element.insertAdjacentHTML('afterbegin', '<h2>' + element.id + '</h2>');
			tempAnchors.push({
				text: element.id,
				link: '#' + element.id
			});
		});
		// for every element of the "H3sectionsArr" array
		H3sectionsArr.forEach((element) => {
			// add h3 tag with element's id as content
			element.insertAdjacentHTML('afterbegin', '<h3>' + element.id + '</h3>');
		});

		H4sectionsArr.forEach((element) => {
			element.insertAdjacentHTML('afterbegin', '<h4>' + element.id + '</h4>');
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

<div id="wiki">
	<nav>
		<a href="/" id="nav__logo">TFHC <span>Wiki</span></a>

		<button id="burgerMenu" on:click={() => (isOpen = !isOpen)} class:show={isOpen}>
			{#if !isOpen}
				<OpenMenuSVG />
			{:else}
				<CloseMenuSVG />
			{/if}
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

	<div id="overlay" class:show={isOpen}>
		{#each anchors as anchor}
			<a href={anchor.link} on:click={() => (isOpen = !isOpen)}>{anchor.text}</a>
		{/each}
	</div>

	<main id="main">
		<Wipbanner />
		<Theme />
		<slot name="content" />
	</main>
	<footer>
		zuletzt bearbeitet am:
		<slot name="editdate" />
	</footer>
</div>

<style lang="scss">
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

	#burgerMenu {
		display: none;

		@media (max-width: 800px) {
			display: inline-block;

			> #menuOpen {
				display: block;

				&#burgermenu .show {
					display: none;
				}
			}
			> #menuClose {
				display: none;

				&.show {
					display: block;
				}
			}
		}
	}

	#overlay {
		display: none;

		@media (max-width: 800px) {
			&.show {
				display: flex;
			}
		}
	}
</style>
