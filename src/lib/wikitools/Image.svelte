<script lang="ts">
  import { themeId } from '$lib/pickers/stores';

  export let lightsrc: string;
  export let darksrc: string;
  export let alt: string;

  let prefersDark: boolean = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
</script>

{#if $themeId === 'dark'}
  <img src={darksrc} {alt} />
{:else if $themeId === 'light'}
  <img src={lightsrc} {alt} />
{:else if $themeId === 'auto'}
  {#if prefersDark}
    <img src={darksrc} {alt} />
  {:else}
    <img src={lightsrc} {alt} />
  {/if}
{/if}
