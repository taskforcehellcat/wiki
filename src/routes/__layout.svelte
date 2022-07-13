<script lang="ts">
    import '../app.scss';
    import {themeId} from "../lib/theme/stores.js";

</script>

{#if $themeId}
    <div id="main" data-theme={$themeId}>
        <slot/>
    </div>
{/if}
