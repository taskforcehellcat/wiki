<script lang="ts">
  import { browser } from '$app/environment';
  import { themeId } from '$lib/theme/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let themesOpen = false;
  let themeChoices = ['dark', 'light', 'auto'];

  themeId.subscribe((value) => {
    if (browser) {
      return (localStorage.theme = value);
    }
  });
</script>

<div id="theme-picker" data-location={location}>
  <button
    id="theme-button"
    on:click={() => {
      themesOpen = !themesOpen;
    }}
  >
    <span class="material-icons-rounded">format_paint</span>
  </button>
  {#if themesOpen}
    <div
      id="theme-choices"
      transition:slide={{ axis: 'x', duration: 500 }}
      data-visible={themesOpen}
    >
      {#each themeChoices as themeChoice}
        <div id="theme-choice">
          <input
            type="radio"
            id="theme_{themeChoice}"
            name="theme"
            value={themeChoice}
            bind:group={$themeId}
          />
          <label for="theme_{themeChoice}" />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  // FIXME theme picker placement when collapsed
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
    width: 12rem;
    display: flex;
    justify-content: space-evenly;
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
