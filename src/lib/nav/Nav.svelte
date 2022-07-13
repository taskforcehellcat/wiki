<script>
    import {linkify, NAV_MENU} from "../../menu.js";

    let activeNav;

    function toggleOpen(nav_id) {
        if (nav_id === activeNav) {
            activeNav = null
        } else {
            activeNav = nav_id
        }
    }
</script>

<div id="nav__list">
    {#each NAV_MENU as nav}
        <div class="expandable" class:open={activeNav === nav.id}>
            <span on:click={() => toggleOpen(nav.id)}>
                {nav.id}
                <i class="material-icons-round noselect">expand_more</i>
            </span>
            {#each nav.entries as link}
                <a href="../{linkify(link)}">{link}</a>
            {/each}
        </div>
    {/each}
</div>
