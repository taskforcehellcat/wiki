<script lang="ts">
  export let keys = '';
  import { layoutId } from '$lib/pickers/stores';
  let keysArray = keys.split(',');
  keysArray = keysArray.map((key) => key.trim());

  const mapDeUs = new Map([
    ['CTRL', 'STRG'],
    ['SHIFT', 'UMSCHALT'],
    ['CAPS', 'FESTSTELLEN'],
    ['NUMPAD', 'ZIFFERNBLOCK'],
    ['LMB', 'LINKSKLICK'],
    ['RMB', 'RECHTSKLICK'],
    ['SPACE', 'LEERTASTE'],
    ['INS', 'EINFG'],
    ['DEL', 'ENTF'],
    ['PGUP', 'BILD AUF'],
    ['PGDWN', 'BILD AB'],
    ['SCROLL', 'MAUSRAD']
  ]);

  const mapWinMac = new Map([
    ['ALT', 'OPT'],
    ['WIN', 'CMD'],
    ['ENTER', 'RETURN']
  ]);

  let keysArrayTranslated = keysArray;

  $: if ($layoutId) {
    keysArrayTranslated = keysArray;

    if (['de-win', 'de-mac'].includes($layoutId)) {
      keysArrayTranslated = keysArrayTranslated.map((key) => {
        return mapDeUs.get(key) ?? key;
      });
    }

    if (['de-mac', 'us-mac'].includes($layoutId)) {
      keysArrayTranslated = keysArrayTranslated.map((key) => {
        return mapWinMac.get(key) ?? key;
      });
    }
  }
</script>

{#each keysArrayTranslated as key}
  <kbd>{key}</kbd>
{/each}
