<script lang="ts">
  import { themeId } from '$lib/pickers/stores';
  import getTheme from '$lib/utils/getTheme';

  export let lightsrc: string;
  export let darksrc: string;
  export let alt: string;

  let preferredTheme: 'dark' | 'light';
  preferredTheme = getTheme();
  let imgSrc = preferredTheme ? lightsrc : darksrc;

  $: {
    $themeId;
    console.debug('themeId changed');
    preferredTheme = getTheme();
    imgSrc = preferredTheme === 'light' ? lightsrc : darksrc;
    console.debug('theme is', preferredTheme);
    console.debug('src is', imgSrc);
  }
</script>

<img src={imgSrc} {alt} />
