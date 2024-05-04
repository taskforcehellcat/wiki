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

<div id="nav__list">
  {#each menu as nav}
    <div class="expandable" class:open={activeNav === nav.id}>
      <span
        on:click={() => toggleOpen(nav.id)}
        on:keypress={() => toggleOpen(nav.id)}
      >
        {nav.config.title}
        <i class="material-icons-round noselect">expand_more</i>
      </span>
      {#each nav.entries as article}
        <a href="/{nav.id}/{article.id}">{shortName(article)}</a>
      {/each}
    </div>
  {/each}
</div>
