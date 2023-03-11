<script lang="ts">
  export let keys = '';
  import { keysLayout } from '$lib/stores';
  let keysArray = keys.split(',');
  keysArray = keysArray.map((key) => key.trim());

  const mapDeEn = new Map([
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

  $: if ($keysLayout) {
    keysArrayTranslated = keysArray;

    if (['de-win', 'de-mac'].includes($keysLayout)) {
      keysArrayTranslated = keysArrayTranslated.map((key) => {
        return mapDeEn.get(key) ?? key;
      });
    }

    if (['de-mac', 'en-mac'].includes($keysLayout)) {
      keysArrayTranslated = keysArrayTranslated.map((key) => {
        return mapWinMac.get(key) ?? key;
      });
    }
  }
</script>

{#each keysArrayTranslated as key}
  <kbd>{key}</kbd>
{/each}
