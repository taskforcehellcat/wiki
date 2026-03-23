<script lang="ts">
  import type { Article, Directory } from '../../app';

  export let menu: Array<Directory> = [];
  let activeNav: string | null;

  function toggleOpen(nav_id: string) {
    if (nav_id === activeNav) {
      activeNav = null;
    } else {
      activeNav = nav_id;
    }
  }

  function shortName(article: Article) {
    /*
			returns the articles short title if there is one set
		*/

    if (article.meta.title_short) {
      return article.meta.title_short;
    }
    return article.meta.title;
  }
</script>

<div class="nav__list">
  {#each menu as nav}
    <div
      class="nav__item--expandable"
      class:nav__item--open={activeNav === nav.id}
    >
      <button
        on:click={() => toggleOpen(nav.id)}
        aria-expanded={activeNav === nav.id}
      >
        {nav.config.title}
        <i class="material-icons-round noselect" aria-hidden="true"
          >expand_more</i
        >
      </button>
      {#each nav.entries as article}
        <a href="/{nav.id}/{article.id}">{shortName(article)}</a>
      {/each}
    </div>
  {/each}
</div>
