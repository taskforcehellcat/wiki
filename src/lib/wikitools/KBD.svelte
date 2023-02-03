<kbd>
  <slot />
</kbd>

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
    padding-inline: 0.3rem;
    font-size: inherit;

    &:not(kbd:first-of-type) {
      margin-left: 0.1rem;
    }
  }

  kbd[data-tooltip]::after {
    bottom: -0.5rem;
  }
</style>
