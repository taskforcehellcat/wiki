<script>
  import SearchModal from '$lib/search/SearchModal.svelte';
  import { searchInUse } from './stores';
</script>

<button
  id="search-bar"
  on:click={() => {
    $searchInUse = true;
  }}
/>

{#if $searchInUse}
  <SearchModal />
{/if}

<style lang="scss">
  #search-bar {
    width: min(35rem, 100%);
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #05294d07;
    border: 1px solid var(--border);
    padding-inline: 1.5rem;
    border-radius: 0.6rem;

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
    }

    &::after {
      content: 'Wiki durchsuchen...';
      display: inline-block;
      color: #687076;
      font-size: 10pt;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-inline-end: 1rem;
    }
  }
</style>
