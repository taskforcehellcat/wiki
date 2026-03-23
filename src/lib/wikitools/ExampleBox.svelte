<script>
  import { slide } from 'svelte/transition';

  export let isOpen = false;
  export let title = 'Beispiel:';

  const toggleOpen = () => (isOpen = !isOpen);
</script>

<div class="example-box">
  <button
    class="example-box-header noselect"
    aria-expanded={isOpen}
    on:click={toggleOpen}
  >
    <span>{title}</span>
    <span class="material-icons-round" aria-hidden="true">
      {#if isOpen}remove{:else}add{/if}
    </span>
  </button>
  {#if isOpen}
    <div class="example-box-content" transition:slide|local>
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  .example-box {
    width: min(100%, 110rem);
    background-color: var(--color-example-bg);
    border-radius: 0.5rem;
    border: 1px solid var(--color-example-border);
    margin-bottom: 4rem;
    height: fit-content;
    display: inline-flexbox;

    > .example-box-header {
      background: none;
      border: none;
      border-radius: 0;
      font: inherit;
      color: inherit;
      text-align: left;
      width: 100%;
      align-items: center;
      display: flex;
      height: 4rem;
      justify-content: space-between;
      padding-inline: 2rem;
      cursor: pointer;

      .material-icons-round {
        font-size: 20pt;
        margin-right: -4px;
      }
    }

    > .example-box-content {
      border-top: 1px solid var(--color-example-border);
      height: fit-content;
      display: block;
      padding: 2rem;
    }
  }
</style>
