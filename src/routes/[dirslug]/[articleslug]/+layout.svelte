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
  import TreeView from '$lib/nav/TreeView.svelte';

  // --- id conversions ---
  import { afterUpdate, onMount } from 'svelte';
  import { browser } from '$app/environment';

  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import PageMeta from '$lib/metadata/PageMeta.svelte';
  import LayoutPicker from '$lib/pickers/LayoutPicker.svelte';
  import type { LayoutData } from './$types';

  import type { TreeItem } from '../../../app';

  let isOpen = false;
  let anchorItems: TreeItem[] = [];
  let activeAnchor: string | null = null;

  afterUpdate(() => {
    if (browser) {
      const items: TreeItem[] = [];
      document.querySelectorAll('h2').forEach((element) => {
        items.push({
          id: '#' + element.id,
          label: element.innerText,
          href: '#' + element.id
        });
      });
      anchorItems = items;
      // recompute highlight when the article (and its headings) change
      updateActiveAnchor();
    }
  });

  // while a click-to-scroll is animating, keep the highlight on the
  // clicked entry
  let scrollLock = false;
  let unlockTimer: ReturnType<typeof setTimeout> | undefined;

  function lockScrollspy(href: string) {
    activeAnchor = href;
    scrollLock = true;

    const container = document.getElementById('main');
    clearTimeout(unlockTimer);

    // release once the scroll has settled: poll scrollTop until it stops
    // changing
    let lastTop = NaN;
    const settle = () => {
      const top = container?.scrollTop ?? 0;
      if (top === lastTop) {
        scrollLock = false;
      } else {
        lastTop = top;
        unlockTimer = setTimeout(settle, 100);
      }
    };
    unlockTimer = setTimeout(settle, 100);
  }

  // --- scrollspy: highlight the heading currently in view ---
  function updateActiveAnchor() {
    if (scrollLock) return;

    const headings = document.querySelectorAll<HTMLElement>('content h2');
    if (headings.length === 0) {
      activeAnchor = null;
      return;
    }

    const container = document.getElementById('main');

    // a trailing section can be too short to ever scroll its heading up to
    // the threshold — once we hit the bottom, the last heading is current
    if (
      container &&
      container.scrollTop + container.clientHeight >= container.scrollHeight - 2
    ) {
      activeAnchor = '#' + headings[headings.length - 1].id;
      return;
    }

    // match the scroll-padding-top of the scroll container: clicking an
    // anchor lands its heading at exactly that offset, so a heading counts
    // as "current" the moment its top reaches (or passes) that line
    const pad = container
      ? parseFloat(getComputedStyle(container).scrollPaddingTop)
      : NaN;
    const threshold = (Number.isNaN(pad) ? 70 : pad) + 4;

    let current = '#' + headings[0].id;
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= threshold) {
        current = '#' + h.id;
      } else {
        break;
      }
    }
    activeAnchor = current;
  }

  onMount(() => {
    const container = document.getElementById('main');
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveAnchor();
        ticking = false;
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    updateActiveAnchor();
    return () => container.removeEventListener('scroll', onScroll);
  });

  export let data: LayoutData;

  $: wikiItems = data.menu.map((dir) => ({
    id: dir.id,
    label: dir.config.title,
    children: dir.entries.map((article) => ({
      id: article.id,
      label: article.meta.title_short || article.meta.title,
      href: resolve(`/${dir.id}/${article.id}`)
    }))
  }));
</script>

<Popup />

{#if $themeId}
  <div id="main" data-theme={$themeId}>
    <div class="wiki">
      <nav class="nav__sidebar" aria-label="Seitennavigation">
        <a href={resolve('/')} class="nav__logo">
          <img
            src="/images/tfhcwiki_short.svg"
            alt="TFHC Wiki"
            width="179"
            height="30" />
        </a>

        <button
          class="nav__burger"
          on:click={() => (isOpen = !isOpen)}
          class:nav__burger--open={isOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Navigation schließen' : 'Navigation öffnen'}
          aria-controls="mobile-nav">
          {#if !isOpen}
            <OpenMenuSVG />
          {:else}
            <CloseMenuSVG />
          {/if}
        </button>

        <!-- navigation items -->
        {#if anchorItems.length > 0}
          <div class="nav__list-title">navigation</div>
          <div class="nav__list-wrapper">
            <TreeView
              items={anchorItems}
              activeId={activeAnchor}
              onLinkClick={(item) => item.href && lockScrollspy(item.href)} />
          </div>
        {/if}
        <div class="nav__list-title">wiki</div>
        <TreeView items={wikiItems} />
        <a href={resolve('/')} class="nav__return">Zurück</a>
      </nav>

      <nav
        id="mobile-nav"
        class="nav__overlay"
        class:nav__overlay--show={isOpen}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}>
        {#if anchorItems.length > 0}
          <div class="nav__overlay-group">
            <div class="nav__overlay-title">navigation</div>
            <TreeView
              items={anchorItems}
              activeId={activeAnchor}
              onLinkClick={(item) => {
                if (item.href) lockScrollspy(item.href);
                isOpen = false;
              }} />
          </div>
        {/if}
        <div class="nav__overlay-group">
          <div class="nav__overlay-title">wiki</div>
          <TreeView items={wikiItems} onLinkClick={() => (isOpen = false)} />
        </div>
      </nav>

      <div class="info-bar">
        <Searchbar />
        <div class="info-bar__pickers">
          <ThemePicker location="article" />
          <LayoutPicker location="article" />
        </div>
      </div>

      <content id="main-content" role="main" class="markdown-body">
        <slot />
      </content>

      {#if page.status == 200}
        <footer>
          <p>
            zuletzt bearbeitet: {new Date(page.data.date).toLocaleString(
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
  .wiki {
    min-height: 120vh;
    display: grid;
    grid-template-columns: 38rem 4fr;
    grid-template-rows: 6rem 18fr 12rem;

    @media only screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-rows: 10rem 18fr 12rem;
    }
  }

  .info-bar {
    width: 100%;
    height: 100%;
    background: var(--color-wiki-bg);
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
    align-items: center;

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
    /* scroll room so the last heading can scroll under the info-bar
       and become the active nav entry */
    padding-bottom: 50vh;
  }

  footer {
    grid-row: 3;
    grid-column: 2;
  }

  .info-bar__pickers {
    display: flex;
    gap: 0.75rem;
  }

  :global(p) {
    text-align: justify;
    display: inline-block;
    font-size: var(--font-size-base);
    margin-bottom: 1.5rem;
    line-height: 1.65;
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
    color: var(--color-text-secondary);
    width: min(110rem, 100%);
  }

  :global(content h1) {
    font-size: var(--font-size-h1);
    font-weight: 650;
    letter-spacing: -0.01em;
    margin-bottom: 0.5rem;
  }

  :global(content h2) {
    font-size: var(--font-size-h2);
    font-weight: 620;
    letter-spacing: -0.005em;
    margin-top: 3.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.4rem;
  }

  :global(content h3) {
    font-size: var(--font-size-h3);
    font-weight: 590;
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
  }

  :global(img:not(a > img)) {
    width: min(100%, 60rem);
    border-radius: 0.4rem;
  }

  .nav__list-title {
    color: var(--color-neutral);
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.85em;
    letter-spacing: 0.15rem;
    margin-bottom: -2rem;
  }

  .nav__list-wrapper {
    height: fit-content;
    box-sizing: unset;
  }

  /* continuous muted line on the container; the active entry draws an
     accent border over just its own segment, gaps keep the muted line */
  .nav__list-wrapper :global(.tree-view) {
    gap: 20px;
    padding: 0.4rem 0;
    font-size: 0.95em;
    border-left: 2px solid var(--color-bg-secondary);
  }

  .nav__list-wrapper :global(.tree-view__link) {
    margin-left: -2px;
    border-left: 2px solid transparent;
    transition: border-color 0.2s ease-out;
  }

  .nav__list-wrapper :global(.tree-view__link a) {
    padding-left: 15px;
  }

  .nav__list-wrapper :global(.tree-view__link:has(a.active)) {
    border-left-color: var(--color-nav-hover);
  }

  .nav__overlay-group :global(.tree-view) {
    gap: 2rem;
  }

  .nav__sidebar {
    height: 100vh;
    background-color: var(--color-bg-primary);
    display: flex;
    color: var(--color-text-muted);
    flex-direction: column;
    padding: 10%;
    gap: 3rem;
    position: sticky;
    top: 0;
    overflow-y: auto;
    scrollbar-width: none;

    @media only screen and (max-width: 800px) {
      grid-row: unset;
      grid-column: unset;
      display: none;
      grid-column: 2;
      height: 100%;
      position: sticky;
      z-index: 300;
    }
  }

  .nav__sidebar::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    .nav__list-title,
    .nav__list-wrapper {
      display: none;
    }

    .nav__sidebar {
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
    color: var(--color-kbd-text);
    background-color: var(--color-kbd-bg);
    border-radius: 0.35rem;
    font-family: 'Fira Mono', monospace;
    font-size: 0.9em;
    width: fit-content;
    min-width: 2rem !important;
    text-align: center;
    border: 1px solid var(--color-kbd-border);
    padding: 0.15rem 0.5rem;
    box-shadow: 0 1px 0 var(--color-kbd-border);

    &:not(kbd:first-of-type) {
      margin-left: 0.1rem;
    }
  }

  :global(kbd[data-tooltip]::after) {
    bottom: -0.5rem;
  }

  .nav__burger {
    display: none;
    @media (max-width: 800px) {
      display: inline-block;
    }
  }

  .nav__overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 200;
    background-color: var(--color-bg-primary);
    padding: 12rem 4rem 4rem 4rem;
    overflow-y: auto;
    flex-direction: column;
    gap: 2rem;
    font-size: var(--font-size-xl);
    font-weight: 500;
    color: var(--color-text-muted);

    @media (max-width: 800px) {
      &.nav__overlay--show {
        display: flex;
      }
    }
  }

  .nav__overlay-group {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .nav__overlay-title {
    color: var(--color-neutral);
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.65em;
    letter-spacing: 0.15rem;
  }
</style>
