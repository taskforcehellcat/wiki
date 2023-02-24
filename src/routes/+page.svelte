<!-- Homepage -->
<script lang="ts">
  import '../app.scss';
  import Theme from '$lib/theme/Theme.svelte';
  import Nav from '$lib/nav/Nav.svelte';
  import { themeId } from '$lib/theme/stores';

  export let data;
</script>

<svelte:head>
  <title>Home | TFHC Wiki</title>
</svelte:head>

{#if $themeId}
  <div id="main" data-theme={$themeId}>
    <Theme />
    <div id="home">
      <div id="home__top">
        <a id="home__link" href="https://taskforcehellcat.de/"
          ><span class="material-icons"> chevron_left </span>
          Zurück zur Hauptseite</a
        >
        <img id="home__nav__logo" class="noselect" src="/images/tfhcwiki_full.svg" alt="Task Force Hellcat Logo" />
      </div>

      <!-- search bar -->
      <div id="search" data-empty="true">
        <div id="search__searchbar">
          <span class="material-icons noselect">search</span>
          <input type="text" name="search" placeholder="Wiki durchsuchen..." />
        </div>
        <div id="search__results" />
      </div>
      <div id="home__nav">
        <Nav menu={data.menu} />
      </div>
    </div>
  </div>
{/if}

<style>
  #home {
    padding: 15rem 5rem 20%;
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    background-color: var(--brandPrimaryBG);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--brandTertiaryTXT);
    gap: 4rem;
  }

  #home__nav__logo {
    font-size: 35pt;
    font-weight: 300;
    color: var(--brandNeutral);
    text-align: center;
    white-space: nowrap;
  }

  #home__top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #search__searchbar {
    background-color: var(--brandSecondaryBG);
    width: 80rem;
    height: 3rem;
    border-radius: 0.7rem;
    -webkit-border-radius: 0.7rem;
    -moz-border-radius: 0.7rem;
    -ms-border-radius: 0.7rem;
    -o-border-radius: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 3.5rem;
  }

  #search__searchbar input {
    width: 100%;
    height: 24px;
    color: var(--brandTertiaryTXT);
    font-size: 14pt;
    font-weight: 300;
  }

  #search__searchbar .material-icons {
    font-size: 20pt;
    color: var(--brandTertiaryTXT);
  }
</style>
