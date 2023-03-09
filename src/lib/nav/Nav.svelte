<script>
  import { searchInUse } from '$lib/search/stores';

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
    <div class="expandable" class:open={activeNav === nav.id} class:invisible={$searchInUse}>
      <span on:click={() => toggleOpen(nav.id)}>
        {nav.config.title}
        <i class="material-icons-rounded noselect">expand_more</i>
      </span>
      {#each nav.entries as article}
        <a href="/articles/{nav.id}/{article.id}">{shortName(article)}</a>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .invisible {
    display: none;
  }
</style>
