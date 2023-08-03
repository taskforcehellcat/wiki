<script lang="ts">
  import { themeId } from '$lib/pickers/stores';
  import { getTheme, clientPrefLight } from '$lib/utils/getTheme';

  export let lightsrc: string;
  export let darksrc: string;
  export let alt: string;

  let preferredTheme: 'dark' | 'light';
  preferredTheme = getTheme();
  let imgSrc = preferredTheme === 'light' ? lightsrc : darksrc;

  $: {
    $themeId; // react on changing picker option (themeId)
    $clientPrefLight; // or the client preference (in case auto is selected)
    preferredTheme = getTheme();
    imgSrc = preferredTheme === 'light' ? lightsrc : darksrc;
  }
</script>

<img src={imgSrc} {alt} />
