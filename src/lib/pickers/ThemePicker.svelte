<script lang="ts">
  import { browser } from '$app/environment';
  import { themeId } from '$lib/pickers/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let open = false;
  let choices = ['dark', 'light', 'auto'];

  $: if (browser) localStorage.theme = $themeId;
</script>

<div id="theme-picker" data-location={location}>
  {#if open}
    <div
      id="theme-choices"
      transition:slide|local={{ axis: 'x', duration: 500 }}
      data-visible={open}
    >
      {#each choices as choice}
        <div id="theme-choice">
          <input
            type="radio"
            id="theme_{choice}"
            name="theme"
            value={choice}
            bind:group={$themeId}
          />
          <label for="theme_{choice}" />
        </div>
      {/each}
    </div>
  {/if}
  <button
    id="theme-button"
    on:click={() => {
      open = !open;
    }}
  >
    <span class="material-icons-rounded">format_paint</span>
  </button>
</div>

<style lang="scss">
  // FIXME theme picker on the homepage

  #theme-picker {
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

  #theme-button {
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

  #theme-choices {
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

      &[for='theme_light'] {
        background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
      }

      &[for='theme_dark'] {
        background: linear-gradient(-45deg, #0a0a0a 50%, #1b1b1b 5%);
      }

      &[for='theme_auto'] {
        background-color: var(--brandPrimaryBG);

        &:after {
          content: 'A';
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--brandTertiaryTXT);
        }
      }
    }
  }
</style>
