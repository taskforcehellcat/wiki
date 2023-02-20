<script>
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

  <div class="example-box-content" class:show={isOpen}>
    <slot />
  </div>
</div>

<style lang="scss">
  .example-box {
    width: 100%;
    background-color: var(--exampleBoxBG);
    border-radius: 0.5rem;
    margin-bottom: 4rem;

    > .example-box-header {
      align-items: center;
      border-bottom: 1px solid var(--exampleBoxBorder);
      border-left: 1px solid var(--exampleBoxBorder);
      border-right: 1px solid var(--exampleBoxBorder);
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      border-top: 1px solid var(--exampleBoxBorder);
      display: flex;
      height: 4rem;
      justify-content: space-between;
      padding-inline: 2rem;

      &[aria-expanded='false'] {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }

      &:hover {
        cursor: pointer;
      }

      .material-icons {
        font-size: 20pt;
        margin-right: -4px;
        transition: transform 0.2s ease-in;
      }
    }

    > .example-box-content {
      border-bottom: 1px solid var(--exampleBoxBorder);
      border-right: 1px solid var(--exampleBoxBorder);
      border-left: 1px solid var(--exampleBoxBorder);
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      height: fit-content;
      display: none;
      padding: 2rem;

      &.show {
        display: block;
      }
    }
  }
</style>
