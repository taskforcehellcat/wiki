<script lang="ts">
  export let keys = '';
  let keysArray = keys.split(',');
  keysArray = keysArray.map((key) => key.trim());
  // let slot = $$props.$$slots;
</script>

{#each keysArray as key}
  <kbd>{key}</kbd>
{/each}
