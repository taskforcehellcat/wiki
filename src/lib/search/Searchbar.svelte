<script>
  import SearchModal from '$lib/search/SearchModal.svelte';
  import Keys from '$lib/wikitools/Keys.svelte';
  import { searchInUse } from './stores';
</script>

<button
  id="search-bar"
  on:click={() => {
    $searchInUse = true;
  }}>
  <span class="placeholder">Wiki durchsuchen...</span>
  <span class="keys"><Keys keys="CTRL, K" /></span>
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
    background-color: var(--color-btn-bg);
    border: 1px solid var(--color-border-muted);
    padding-inline: 1.5rem;
    border-radius: 0.6rem;
    transition:
      background-color 0.2s ease-out,
      border-color 0.2s ease-out,
      box-shadow 0.2s ease-out;

    &:hover {
      background-color: var(--color-btn-hover-bg);
      border-color: var(--color-text-muted);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-focus-ring, var(--color-text-muted));
      border-color: transparent;
    }

    &:active {
      transform: scale(0.99);
    }

    .placeholder {
      display: inline-block;
      color: #687076;
      font-size: 10pt;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-inline-end: 1.5rem;
      white-space: nowrap;
      display: flex;
      align-items: center;

      &::before {
        content: 'search';
        display: inline-block;
        width: 1.5rem;
        font-family: 'Material Icons Round';
        font-size: 2.1rem;
        color: #687076;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-inline-end: 1.5rem;
      }
    }

    .keys {
      display: inline-flex;
      align-items: center;
    }
  }
</style>
