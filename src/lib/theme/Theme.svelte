<script lang="ts">
    import {browser} from '$app/env';
    import {themeId} from './stores';

    let themesOpen = false;
    let themeChoices = [
        'dark',
        'light',
        'auto',
    ];

    themeId.subscribe((value) => {
        if (browser) {
            return (localStorage.theme = value);
        }
    });
</script>

<div id="theme">
    <button id="theme__button" on:click={() => {themesOpen = !themesOpen}} data-visible={themesOpen}>
        <span class="material-icons">format_paint</span>
    </button>
    <div id="theme__picker" data-visible={themesOpen}>
        {#each themeChoices as themeChoice}
            <input
                    type="radio"
                    id="theme_{themeChoice}"
                    name="theme"
                    value={themeChoice}
                    bind:group={$themeId}
                    on:click={() => {themesOpen = !themesOpen}}
            />
            <label for="theme_{themeChoice}"></label>
        {/each}
    </div>
</div>

<style lang="scss">
  #theme {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 10;
  }

  #theme__button {
    --theme-border-radius: 1.5rem;

    width: 6rem;
    height: 6rem;
    border: none;
    cursor: pointer;
    border-radius: var(--theme-border-radius);
    background-color: var(--brandSecondaryBG);
    color: var(--brandSecondaryTXT);

    &[data-visible=true] {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  #theme__picker {
    --themePickerBG: #fff;
    --themePickerBG: #1b1b1b;
    width: 6rem;
    height: fit-content;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    background-color: var(--brandSecondaryBG);
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    display: none;
    padding-block: 2rem;
    border: 0.2rem solid var(--brandSecondaryBG);

    &[data-visible=true] {
      display: flex;
    }

    input {
      display: none;
    }

    label {

      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border: 0.2rem solid var(--themePickerBorderColor);

      &[for='theme_light'] {
        background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
      }

      &[for='theme_dark'] {
        background: linear-gradient(-45deg, #0a0a0a 50%, #1b1b1b 5%);
      }

      &[for='theme_auto'] {
        background-color: var(--brandPrimaryBG);
    }
  }
</style>
