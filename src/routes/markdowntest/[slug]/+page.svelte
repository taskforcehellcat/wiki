<!-- <script lang="ts"></script> -->
<script>
    import Wipbanner from '$lib/wipbanner/wipbanner.svelte';
    // --- themes ---
    import Theme from '$lib/theme/Theme.svelte';

    // --- burger menu ---
    import OpenMenuSVG from '$lib/burgermenu/openMenu.svelte';
    import CloseMenuSVG from '$lib/burgermenu/closeMenu.svelte';
    import Nav from '$lib/nav/Nav.svelte';

    // --- id conversions ---
    import { linkify } from '$lib/helpers.js';

    let isOpen = false;
    let anchors = [];

    import { onMount } from 'svelte';

    let Thing;

    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data)


    onMount(async () => {
        Thing = (await import('$lib/content/testing.svx')).default;
    });

</script>

<div id="wiki">
    <nav>
        <a href="/static" id="nav__logo"><img src="/images/tfhcwiki_short.svg" alt="TFHC Wiki" /></a>

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
                    <a href={linkify(anchor.link)}>{anchor.text}</a>
                {/each}
            </div>
        </div>
        <div class="nav__list-title">wiki</div>
        <Nav />
        <a href="/static" id="return-button">Zurück</a>
    </nav>

    <div id="overlay" class:show={isOpen}>
        {#each anchors as anchor}
            <a href={linkify(anchor.link)} on:click={() => (isOpen = !isOpen)}>{anchor.text}</a>
        {/each}
    </div>

    <main id="main">
        <Wipbanner />
        <Theme />
        {data}
        <svelte:component this={Thing} answer={42}>
            <p>some slotted content</p>
        </svelte:component>
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
