<style>
  #wiki-wrapper {
    min-height: 120vh;
    display: grid;
    grid-template-columns: 38rem 4fr;
    grid-template-rows: 10fr 1fr;
  }
  #nav-list-bar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  input {
    background-color: none;
    background: none;
    border: none;
  }

  #nav-search {
    background-color: #273252;
    width: 100%;
    height: 5.5rem;
    border-radius: 0.7rem;
    -webkit-border-radius: 0.7rem;
    -moz-border-radius: 0.7rem;
    -ms-border-radius: 0.7rem;
    -o-border-radius: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  #nav-search {
    padding: 5%;
  }

  #nav-search input {
    width: 100%;
    height: 24px;
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
  }

  .nav-list-title {
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin-bottom: -2rem;
  }

  #nav-search .material-icons {
    font-size: 20pt;
    color: #94a2cf;
  }

  input::placeholder {
    color: #94a2cf;
    font-weight: 300;
  }

  input:focus,
  input:focus {
    outline: none;
  }

  #nav-list-wrapper {
    display: flex;
    gap: 15px;
    height: fit-content;
    box-sizing: unset;
  }

  #nav-list-bar {
    width: 3px;
    background-color: #2d3653;
    height: 100%;
    border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
    -ms-border-radius: 0.2rem;
    -o-border-radius: 0.2rem;
  }

  #nav-list-bar-thumb {
    width: 100%;
    background-color: #94a2cf;
  }

  #wiki-nav-list {
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.8rem 0 0.8rem 0;
  }

  nav {
    height: 100vh;
    background-color: #101b3b;
    display: flex;
    color: #fff;
    flex-direction: column;
    padding: 10%;
    gap: 3rem;
    color: #94a2cf;
    position: sticky;
    z-index: 99;
    top: 0;
    overflow-y: auto;
  }

  nav::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    #wiki-wrapper {
      grid-template-columns: 1fr;
      grid-template-rows: 10rem 10fr 1fr;
    }
    .nav-list-title,
    #nav-list-wrapper,
    #nav-search {
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

<script lang="ts">
  import { Link } from "svelte-routing";

  let anchors = [];

  // --- burger menu ---

  import { toggleBurgerIcon, toggleBurgerMenu } from "./Burger.svelte";

  var menuOpen;
  var menuClose;
  var main;
  var burgerMenu;
  var hideBurgerMenu;

  // --- search bar functionality ---

  import { searchFor, updateSearchResults } from "../public/scripts/search_backend/search.js";

  let query = "";
  let showResults = false;
  let searchResults = [];

  // ---

  import { onMount } from "svelte";
  import { includeDropDown } from "../public/scripts/navigation/nav.js";
  import Nav from "./Nav.svelte";

  onMount(async () => {
    includeDropDown();
    const sections = document.querySelectorAll("section:not(section>section)");

    toggleBurgerIcon();
    // create array from "sections" nodelist
    var sectionsArr = Array.from(sections);

    let tempAnchors = [];

    // for every element of the "sectionsArr" array
    sectionsArr.forEach((element) => {
      // add h2 tag with element's id as content
      element.insertAdjacentHTML("afterbegin", "<h2>" + element.id + "</h2>");
      tempAnchors.push({
        text: element.id,
        link: "#" + element.id,
      });
    });
    anchors = tempAnchors;
  });

  const handleQuery = (e) => {
    query = e.target.value;

    let searchInUse = query.length !== 0;

    // do the styling
    // hide results box if search bar empty
    document.getElementById("search-wrapper").dataset.empty = !searchInUse;

    // @Fenres Rest der Naviagtion verstecken, wenn gesucht wird?
    
    // document.getElementById("nav-list").style.display = searchInUse ? "none" : "flex";

    if (query.length > 2) {
      showResults = true;
    } else {
      showResults = false;
    }

    searchResults = updateSearchResults(query);
  };


</script>

<svelte:window on:load={toggleBurgerIcon} on:resize={toggleBurgerIcon} />

<div id="wiki-wrapper">
  <nav>
    <Link to="/" id="nav-logo" on:click={hideBurgerMenu}>TFHC <span>Wiki</span></Link>

    <button id="burgerMenu" bind:this={burgerMenu} on:click={toggleBurgerMenu}>
      <svg id="menuOpen" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 400 398" fill="#fff" bind:this={menuOpen}><g transform="translate(-1321 -509)"><rect width="400" height="78" transform="translate(1321 509)" /><rect width="400" height="78" transform="translate(1321 668)" /><rect width="400" height="78" transform="translate(1321 829)" /></g></svg>

      <svg id="menuClose" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 338 338" fill="#fff" bind:this={menuClose}><g transform="translate(-1355.001 -567.001)"><rect width="400" height="78" transform="translate(1410.156 567.001) rotate(45)" /><rect width="400" height="78" transform="translate(1355.001 849.844) rotate(-45)" /></g></svg>
    </button>

    <!-- search bar -->
    <div id="search-wrapper" dataset-empty="true">
      <div id="nav-search">
        <span class="material-icons">search</span>
        <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery}/>
      </div>

      <div id="nav-search-results">
        {#if showResults}
          <!-- Hier restliche Logik, erstmal nur Fehlertext zu Testzwecken -->
          <p><span id="searcherrortext">Bitte mindestens drei Zeichen eingeben!</span></p>
        {/if}
      </div>
    </div>

    <!-- navigation items -->
    <div class="nav-list-title">navigation</div>
    <div id="nav-list-wrapper">
      <div id="nav-list-bar">
        <div id="nav-list-bar-thumb" />
      </div>

      <div id="wiki-nav-list">
        {#each anchors as anchor}
          <a href={anchor.link}>{anchor.text}</a>
        {/each}
      </div>
    </div>
    <div class="nav-list-title">wiki</div>
    <Nav />
    <Link to="/" id="return-button">Zurück</Link>
  </nav>

  <div id="overlay">
    {#each anchors as anchor}
      <a on:click={toggleBurgerMenu} href={anchor.link}>{anchor.text}</a>
    {/each}
  </div>

  <main id="main" bind:this={main}>
    <slot name="content" />
  </main>
  <footer />
</div>
