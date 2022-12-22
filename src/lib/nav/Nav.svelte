<script>
	import { linkify } from '$lib/helpers';

	let activeNav;
	export let menu = [];

	function toggleOpen(nav_id) {
		if (nav_id === activeNav) {
			activeNav = null;
		} else {
			activeNav = nav_id;
		}
	}
</script>

<div id="nav__list">
    {#each menu as nav}
        <div class="expandable" class:open={activeNav === nav.id}>
			<span on:click={() => toggleOpen(nav.id)}>
				{nav.config.title}
                <i class="material-icons-round noselect">expand_more</i>
			</span>
            {#each nav.entries as article}
                <a href="/articles/{nav.id}/{article.id}">{article.meta.title}</a>
            {/each}
        </div>
    {/each}
</div>
