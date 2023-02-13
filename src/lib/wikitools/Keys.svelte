<script lang="ts">
  export let keys = '';
  let keysArray = keys.split(',');
  keysArray = keysArray.map((key) => key.trim());
  // let slot = $$props.$$slots;
</script>

{#each keysArray as key}
  <kbd>{key}</kbd>
{/each}

<style lang="scss">
  kbd {
    color: var(--kbdTXT);
    background-color: var(--kbdBG);
    border-radius: 0.2rem;
    font-family: monospace;
    width: fit-content;
    min-width: 2.5rem !important;
    text-align: center;
    border: 1px solid var(--kbdBRD);
    padding-inline: 0.4rem;
    font-size: inherit;

    &:not(kbd:first-of-type) {
      margin-left: 0.1rem;
    }
  }

  :global(kbd[data-tooltip]::after) {
    bottom: -0.5rem;
  }
</style>
