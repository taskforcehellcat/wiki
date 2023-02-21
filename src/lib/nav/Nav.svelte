<script>
  import { slide } from 'svelte/transition';

  let activeNav;
  export let menu = [];

  function toggleOpen(nav_id) {
    if (nav_id === activeNav) {
      activeNav = null;
    } else {
      activeNav = nav_id;
    }
  }

  function shortName(article) {
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
      <span on:click={() => toggleOpen(nav.id)}>
        {nav.config.title}
        <i class="material-icons-round noselect">expand_more</i>
      </span>
      {#if activeNav}
        <div transition:slide|local>
          {#each nav.entries as article}
            <a href="/articles/{nav.id}/{article.id}">{shortName(article)}</a>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
