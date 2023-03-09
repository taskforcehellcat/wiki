<script lang="ts">
  import { browser } from '$app/environment';
  import { themeId } from '$lib/theme/stores';

  export let location = '';
  let themeDiv: HTMLDivElement;

  let themesOpen = false;
  let themeChoices = ['dark', 'light', 'auto'];

  themeId.subscribe((value) => {
    if (browser) {
      return (localStorage.theme = value);
    }
  });
</script>

<div id="theme" bind:this={themeDiv} data-location={location}>
  <button
    id="theme__button"
    on:click={() => {
      themesOpen = !themesOpen;
    }}
    data-visible={themesOpen}
  >
    <span class="material-icons-rounded">format_paint</span>
  </button>
  <div id="theme__picker" data-visible={themesOpen}>
    {#each themeChoices as themeChoice}
      <input
        type="radio"
        id="theme_{themeChoice}"
        name="theme"
        value={themeChoice}
        bind:group={$themeId}
        on:click={() => {
          themesOpen = !themesOpen;
        }}
      />
      <label for="theme_{themeChoice}" />
    {/each}
  </div>
</div>

<style lang="scss">
  #theme {
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
    }
  }

  #theme__button {
    --theme-border-radius: 0.7rem;
    border: 1px solid var(--border);

    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    cursor: pointer;
    color: #687076;
    background-color: #05294d07;
    border-radius: 0.6rem;

    span {
      font-size: 2.1rem;
    }

    &[data-visible='true'] {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: none;
    }
  }

  #theme__picker {
    width: 100%;
    height: fit-content;
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    display: none;
    border: 1px solid var(--border);
    background-color: var(--theme-main);
    padding-top: 1rem;

    &[data-visible='true'] {
      display: flex;
    }

    input {
      display: none;
    }

    label {
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 0.6rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border: 1px solid var(--border);

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
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--brandTertiaryTXT);
        }
      }
    }
  }
</style>
