<script lang="ts">
  import Popup from '$lib/aprilfools/Popup.svelte';

  import '../../../app.scss';
  import { themeId } from '$lib/pickers/stores';
  import '$lib/mdstyling/github.css';
  import Searchbar from '$lib/search/Searchbar.svelte';

  // --- themes ---
  import ThemePicker from '$lib/pickers/ThemePicker.svelte';

  // --- burger menu ---
  import OpenMenuSVG from '$lib/burgermenu/openMenu.svelte';
  import CloseMenuSVG from '$lib/burgermenu/closeMenu.svelte';
  import Nav from '$lib/nav/Nav.svelte';

  // --- id conversions ---
  import { afterUpdate, onMount } from 'svelte';
  import { browser } from '$app/environment';

  import { page } from '$app/stores';
  import PageMeta from '$lib/metadata/PageMeta.svelte';
  import LayoutPicker from '$lib/pickers/LayoutPicker.svelte';
  import type { LayoutData } from './$types';

  type Anchor = {
    text: string;
    link: string;
  };

  let isOpen = false;
  let anchors: Array<Anchor> = [];

  afterUpdate(() => {
    let tempAnchors: Array<Anchor> = [];
    if (browser) {
      document.querySelectorAll('h2').forEach((element) => {
        tempAnchors.push({
          text: element.innerText,
          link: '#' + element.id
        });
      });
      anchors = tempAnchors;
    }
  });

  export let data: LayoutData;
</script>

<Popup />

{#if $themeId}
  <div id="main" data-theme={$themeId}>
    <div id="wiki">
      <nav>
        <a href="/" id="nav__logo"
          ><img src="/images/tfhcwiki_short.svg" alt="TFHC Wiki" /></a
        >

        <button
          id="burgerMenu"
          on:click={() => (isOpen = !isOpen)}
          class:show={isOpen}
        >
          {#if !isOpen}
            <OpenMenuSVG />
          {:else}
            <CloseMenuSVG />
          {/if}
        </button>

        <!-- navigation items -->
        {#if anchors.length > 0}
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
        {/if}
        <div class="nav__list-title">wiki</div>
        <Nav menu={data.menu} />
        <a href="/" id="return-button">Zurück</a>
      </nav>

      <div id="overlay" class:show={isOpen}>
        {#each anchors as anchor}
          <a href={anchor.link} on:click={() => (isOpen = !isOpen)}
            >{anchor.text}</a
          >
        {/each}
      </div>

      <div id="info-bar">
        <Searchbar />
        <div id="pickers">
          <ThemePicker location="article" />
          <LayoutPicker location="article" />
        </div>
      </div>

      <content class="markdown-body">
        <slot />
      </content>

      {#if $page.status == 200}
        <footer>
          <p>
            zuletzt bearbeitet: {new Date($page.data.date).toLocaleString(
              'de-DE',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )}
          </p>
        </footer>
      {/if}
    </div>
  </div>
{/if}

<PageMeta />

<style lang="scss">
  #wiki {
    min-height: 120vh;
    display: grid;
    grid-template-columns: 38rem 4fr;
    grid-template-rows: 6rem 18fr 12rem;

    @media only screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-rows: 10rem 18fr 12rem;
    }
  }

  #info-bar {
    width: 100%;
    height: 100%;
    background: var(--wikiBG);
    grid-column: 2;
    grid-row: 1;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border-muted);
    position: sticky;
    top: 0;
    padding-inline: 8rem;
    padding-block: 1.2rem;
    display: flex;
    justify-content: space-between;

    z-index: 100;

    @media only screen and (max-width: 800px) {
      grid-row: unset;
      grid-column: unset;
      display: none;
    }
  }

  content {
    grid-column: 2;
    grid-row: 2;
  }

  footer {
    grid-row: 3;
    grid-column: 2;
  }

  #pickers {
    display: flex;
    gap: 1rem;
  }

  #nav__list-bar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  :global(p) {
    text-align: justify;
    display: inline-block;
    font-size: 13pt;
    margin-bottom: 1.5rem;
  }

  :global(
      content p,
      content h1,
      content h2,
      content h3,
      content h4,
      content h5,
      content h6,
      content ul,
      content ol,
      content blockquote,
      content pre,
      content table,
      content .example-box
    ) {
    width: 100%;
    color: var(--brandSecondaryTXT);
    width: min(110rem, 100%);
  }

  :global(img:not(a > img)) {
    width: min(100%, 60rem);
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
    color: var(--brandTertiaryTXT);
    flex-direction: column;
    padding: 10%;
    gap: 3rem;
    position: sticky;
    top: 0;
    overflow-y: auto;

    @media only screen and (max-width: 800px) {
      grid-row: unset;
      grid-column: unset;
      display: none;
      grid-column: 2;
      height: 100%;
    }
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

  :global(kbd) {
    color: var(--kbdTXT);
    background-color: var(--kbdBG);
    border-radius: 0.2rem;
    font-family: monospace;
    width: fit-content;
    min-width: 5rem !important;
    text-align: center;
    border: 1px solid var(--kbdBRD);
    padding-inline: 0.5rem;
    font-size: inherit;

    &:not(kbd:first-of-type) {
      margin-left: 0.1rem;
    }
  }

  :global(kbd[data-tooltip]::after) {
    bottom: -0.5rem;
  }

  #burgerMenu {
    display: none;
    @media (max-width: 800px) {
      display: inline-block;
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
