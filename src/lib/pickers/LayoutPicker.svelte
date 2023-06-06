<script lang="ts">
  import { browser } from '$app/environment';
  import { layoutId } from '$lib/pickers/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let open = false;
  let choices = ['de-win', 'de-mac', 'en-win', 'en-mac'];

  $: if (browser) localStorage.layout = $layoutId;
</script>

<div id="layout-picker" data-location={location}>
  <button
    id="layout-button"
    on:click={() => {
      open = !open;
    }}
  >
    <span class="material-icons-rounded">keyboard</span>
  </button>
  {#if open}
    <div
      id="layout-choices"
      transition:slide={{ axis: 'x', duration: 500 }}
      data-visible={open}
    >
      {#each choices as choice}
        <div id="layout-choice">
          <input
            type="radio"
            id={choice}
            name="layout"
            value={choice}
            bind:group={$layoutId}
          />
          <label for={choice} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  // FIXME picker placement when collapsed
  // FIXME picker on the homepage

  #layout-picker {
    &[data-location='home'] {
      position: absolute;
      right: 2.5rem;
      top: 1rem;
      z-index: 10;
      width: 5rem;
    }
    &[data-location='article'] {
      position: unset;
      right: unset;
      top: unset;
      z-index: unset;

      display: flex;
      align-items: center;
      width: fit-content;

      border: 1px solid var(--border);
      background-color: #05294d07;
      border-radius: 0.6rem;
    }
  }

  #layout-button {
    border: none;
    height: 3.5rem; // HACK this should probably be dynamic
    width: 3.5rem;
    cursor: pointer;
    color: #687076;
    border-radius: 0.6rem;
    background-color: transparent;

    span {
      font-size: 1.8rem;
    }
  }

  // TODO keyboard layout options styling

  #layout-choices {
    height: 100%;
    width: fit-content;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;

    border-left: none;
    border-top-right-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;

    &[data-visible='true'] {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left: 1px solid var(--border);
    }

    input {
      display: none;
    }

    label {
      height: 2.5rem;
      aspect-ratio: 1/1;
      border-radius: 0.6rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;

      background: red;

      &[for='de-win'] {
        background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
      }
    }
  }
</style>
