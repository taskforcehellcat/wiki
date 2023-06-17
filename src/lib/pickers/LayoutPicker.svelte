<script lang="ts">
  import { browser } from '$app/environment';
  import { layoutId } from '$lib/pickers/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let open = false;

  let lang: 'de' | 'us' = 'de';
  let platform: 'win' | 'mac' = 'win';

  $: if (browser) localStorage.layout = $layoutId;
  $: {
    $layoutId = `${lang}-${platform}`;
  }
</script>

<div id="layout-picker" data-location={location}>
  {#if open}
    <div
      id="layout-choices"
      transition:slide|local={{ axis: 'x', duration: 500 }}
      data-visible={open}
    >
      {#each ['win', 'mac'] as choice}
        <input
          type="radio"
          id={choice}
          name="layout"
          value={choice}
          bind:group={platform}
        />
        <label for={choice}><div class="symbol" /></label>
      {/each}
      {#each ['de', 'us'] as choice}
        <input
          type="radio"
          id={choice}
          name="layout"
          value={choice}
          bind:group={lang}
        />
        <label for={choice}><div class="symbol" /></label>
      {/each}
    </div>
  {/if}
  <button
    id="layout-button"
    on:click={() => {
      open = !open;
    }}
  >
    <span class="material-icons-rounded">keyboard</span>
  </button>
</div>

<style lang="scss">
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

  #layout-choices {
    height: 100%;
    width: fit-content;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;

    border-right: none;
    border-top-left-radius: 0.6rem;
    border-bottom-left-radius: 0.6rem;

    &[data-visible='true'] {
      border-right: 1px solid var(--border);
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
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.15));
      background-color: darkgray;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--color-canvas-default);

      .symbol {
        width: 60%;
        height: 60%;
        -webkit-mask-size: 100%;
        mask-size: 100%;
        mask-position: center;
        -webkit-mask-position: center;
      }

      &[for='win'] {
        .symbol {
          background-color: var(--brandSecondaryTXT);
          -webkit-mask-image: url(/images/win.svg);
          mask-image: url(/images/win.svg);
        }
      }
      &[for='mac'] {
        .symbol {
          background-color: var(--brandSecondaryTXT);
          -webkit-mask-image: url(/images/mac.svg);
          mask-image: url(/images/mac.svg);
        }
      }

      &[for='de'] {
        .symbol {
          background-image: url(/images/de.svg);
        }
      }
      &[for='us'] {
        .symbol {
          background-image: url(/images/us.svg);
        }
      }
    }
  }
</style>
