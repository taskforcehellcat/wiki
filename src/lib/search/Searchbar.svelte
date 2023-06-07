<script>
  import SearchModal from '$lib/search/SearchModal.svelte';
  import Keys from '$lib/wikitools/Keys.svelte';
  import { searchInUse } from './stores';
</script>

<button
  id="search-bar"
  on:click={() => {
    $searchInUse = true;
  }}
>
  <span class="placeholder">Wiki durchsuchen...</span>
  <span><Keys keys={'CTRL, K'} /></span>
</button>

{#if $searchInUse}
  <SearchModal />
{/if}

<style lang="scss">
  #search-bar {
    width: min(35rem, 100%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: #05294d07;
    border: 1px solid var(--border);
    padding-inline: 1.5rem;
    border-radius: 0.6rem;

    .placeholder {
      content: 'Wiki durchsuchen...';
      display: inline-block;
      color: #687076;
      font-size: 10pt;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-inline-end: 1.5rem;
      white-space: nowrap;

      &::before {
        content: 'search';
        display: inline-block;
        width: 1.5rem;
        font-family: 'Material Icons Rounded';
        font-size: 2.1rem;
        color: #687076;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-inline-end: 1.5rem;
        vertical-align: -22%; // i dont want to talk about it
      }
    }
  }
</style>
