<script lang="ts">
  let hidden = true;
  let searchDialogBar: HTMLInputElement;

  const keyPressed = (event) => {
    if (event.key === 'Escape') {
      hidden = true;
      searchDialogBar.value = '';
    }
  };
</script>

<button
  id="search-bar"
  on:mousedown|preventDefault={() => {
    hidden = !hidden;
    searchDialogBar.focus(); // doesn't work.. :(
  }}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  id="bg-tint"
  role="dialog"
  data-hidden={hidden}
  on:click={() => {
    hidden = true;
    searchDialogBar.value = '';
  }}
/>

<div id="search-dialog" data-hidden={hidden} on:keydown={keyPressed}>
  <!-- svelte-ignore a11y-autofocus -->
  <div id="input-wrapper">
    <input type="text" placeholder="Wiki durchsuchen..." bind:this={searchDialogBar} autofocus />
  </div>
  <!-- autofocus doesn't work, idk why -->
</div>

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
      font-family: 'Material Icons Round';
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

  #bg-tint {
    &[data-hidden='false'] {
      background-color: rgba(0, 0, 0, 0.55);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;

      &[data-hidden='true'] {
        display: none;
      }
    }
  }

  #search-dialog {
    &[data-hidden='false'] {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      width: min(75rem, 100%);
      height: 40rem;
      border-radius: 1.5rem;
      z-index: 100;

      #input-wrapper {
        width: 100%;
        height: 8rem;
        display: flex;
        gap: 2rem;
        border-top-right-radius: 1.5rem;
        border-bottom: 1px solid var(--border);
        border-top-left-radius: 1.5rem;
        padding-inline: 4rem;

        input {
          border-top-right-radius: inherit;
          border-top-left-radius: inherit;
          font-size: 2rem;
          color: var(--text);
          height: 100%;
          width: 100%;
          color: var(--brandSecondaryTXT);
          padding-block: 2rem;
          display: flex;
          align-items: center;
        }

        &:before {
          content: 'search';
          display: inline;
          width: fit-content;
          font-size: 2.8rem;
          font-family: 'Material Icons Round';
          color: #687076;
          display: flex;
          align-items: center;
        }
      }
    }

    &[data-hidden='true'] {
      display: none;
    }
  }
</style>
