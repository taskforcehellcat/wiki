<script lang="ts">
  import { browser } from '$app/environment';
  import { layoutId } from '$lib/pickers/stores';
  import { slide } from 'svelte/transition';

  export let location = '';

  let open = false;

  let lang: 'de' | 'us' = 'de';
  let platform: 'win' | 'mac' = 'win';

  const platformLabels: Record<string, string> = {
    win: 'Windows',
    mac: 'macOS'
  };
  const langLabels: Record<string, string> = { de: 'Deutsch', us: 'Englisch' };

  $: if (browser) localStorage.layout = $layoutId;
  $: {
    $layoutId = `${lang}-${platform}`;
  }
</script>

<div class="picker" data-location={location}>
  {#if open}
    <div
      class="picker__choices"
      transition:slide|local={{ axis: 'x', duration: 500 }}
      data-visible={open}>
      {#each ['win', 'mac'] as choice (choice)}
        <input
          type="radio"
          id={choice}
          name="platform"
          value={choice}
          aria-label={platformLabels[choice]}
          bind:group={platform} />
        <label for={choice} aria-hidden="true">
          <div class="symbol"></div>
        </label>
      {/each}
      <div class="divider" aria-hidden="true"></div>
      {#each ['de', 'us'] as choice (choice)}
        <input
          type="radio"
          id={choice}
          name="lang"
          value={choice}
          aria-label={langLabels[choice]}
          bind:group={lang} />
        <label for={choice} aria-hidden="true">
          <div class="symbol"></div>
        </label>
      {/each}
    </div>
  {/if}
  <button
    class="picker__button"
    on:click={() => {
      open = !open;
    }}
    aria-label="Tastaturlayout auswählen"
    aria-expanded={open}>
    <span class="material-icons-round" aria-hidden="true">keyboard</span>
  </button>
</div>

<style lang="scss">
  .divider {
    width: 1px;
    height: 1.8rem;
    background-color: var(--color-border-muted);
  }

  .picker__choices label {
    background-color: var(--color-canvas-default);
    background-position: center;
    background-repeat: no-repeat;

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
        background-color: var(--color-text-secondary);
        -webkit-mask-image: url(/images/win.svg);
        mask-image: url(/images/win.svg);
      }
    }
    &[for='mac'] {
      .symbol {
        background-color: var(--color-text-secondary);
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
</style>
