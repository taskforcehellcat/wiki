<script>
    import {NAV_MENU, linkify} from "../../menu.js";
</script>

<div id="nav__list">
    {#each NAV_MENU as nav}
        <div class="expandable">
            <span>{nav.id}</span>
            {#each nav.entries as link}
                <a href="../{linkify(link)}">{link}</a>
            {/each}
        </div>
    {/each}
</div>
