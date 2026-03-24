<script lang="ts">
  import { browser } from '$app/environment';
  import { themeId } from '$lib/pickers/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let open = false;
  let choices = ['dark', 'light', 'auto'];
  const choiceLabels: Record<string, string> = {
    dark: 'Dunkles Design',
    light: 'Helles Design',
    auto: 'Automatisches Design'
  };

  $: if (browser) localStorage.theme = $themeId;
</script>

<div class="picker" data-location={location}>
  {#if open}
    <div
      class="picker__choices"
      transition:slide|local={{ axis: 'x', duration: 500 }}
      data-visible={open}>
      {#each choices as choice (choice)}
        <div id="theme-choice">
          <input
            type="radio"
            id="theme_{choice}"
            name="theme"
            value={choice}
            aria-label={choiceLabels[choice]}
            bind:group={$themeId} />
          <label for="theme_{choice}" aria-hidden="true"></label>
        </div>
      {/each}
    </div>
  {/if}
  <button
    class="picker__button"
    on:click={() => {
      open = !open;
    }}
    aria-label="Farbschema auswählen"
    aria-expanded={open}>
    <span class="material-icons-round" aria-hidden="true">format_paint</span>
  </button>
</div>

<style lang="scss">
  .picker__choices label {
    &[for='theme_light'] {
      background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
    }

    &[for='theme_dark'] {
      background: linear-gradient(-45deg, #0a0a0a 50%, #1b1b1b 5%);
    }

    &[for='theme_auto'] {
      background-color: var(--color-bg-primary);

      &:after {
        content: 'A';
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-text-muted);
      }
    }
  }
</style>
