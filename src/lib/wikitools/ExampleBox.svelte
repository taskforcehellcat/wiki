<script>
  import { slide } from 'svelte/transition';

  export let isOpen = false;
  export let title = 'Beispiel:';

  const toggleOpen = () => (isOpen = !isOpen);
</script>

<div class="example-box">
  <div class="example-box-header noselect" aria-expanded={isOpen} on:click={toggleOpen} role="presentation">
    <span>{title}</span>
    <span class="material-icons">
      {#if isOpen}remove{:else}add{/if}
    </span>
  </div>
  {#if isOpen}
    <div class="example-box-content" transition:slide|local>
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  .example-box {
    width: 100%;
    background-color: var(--exampleBoxBG);
    border-radius: 0.5rem;
    border: 1px solid var(--exampleBoxBorder);
    margin-bottom: 4rem;
    height: fit-content;
    display: inline-flexbox;

    > .example-box-header {
      align-items: center;
      display: flex;
      height: 4rem;
      justify-content: space-between;
      padding-inline: 2rem;

      &:hover {
        cursor: pointer;
      }

      .material-icons {
        font-size: 20pt;
        margin-right: -4px;
      }
    }

    > .example-box-content {
      border-top: 1px solid var(--exampleBoxBorder);
      height: fit-content;
      display: block;
      padding: 2rem;
    }
  }
</style>
