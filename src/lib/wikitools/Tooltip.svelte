<script lang="ts">
  export let isHovered = false;
  export let image: string;
  export let text = '';

  let x: number;
  let y: number;

  // FIXME proper event handling

  function tapped(event) {
    isHovered = !isHovered;
    x = event.pageX + 5;
    y = event.pageY + 5;
  }

  function mouseOver(event) {
    isHovered = true;
    x = event.pageX + 5;
    y = event.pageY + 5;
  }

  function mouseMove(event) {
    x = event.pageX + 5;
    y = event.pageY + 5;
  }

  function mouseLeave() {
    isHovered = false;
  }
</script>

<svelte:window on:resize={mouseLeave} />

<span
  on:touchstart={tapped}
  on:mouseover={mouseOver}
  on:focus={mouseOver}
  on:mouseleave={mouseLeave}
  on:mousemove={mouseMove}
  data-tooltip><slot /></span
>{#if isHovered}
  <!-- we can't line break the {#if } here because else we get whitespace characters after the tooltip for some reason... -->
  <div style="top: {y}px; left: {x}px;" class="tooltip">
    {#if image}
      <img style="max-width: 100%;" src={image} alt="" />
    {:else}{text}{/if}
  </div>
{/if}

<style lang="scss">
  [data-tooltip] {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      height: 2px;
      bottom: -0.13rem;
      margin: 0 auto;
      left: 0;
      right: 0;
      width: 100%;
      border-bottom: 2px dotted var(--brandPrimaryTXT);
      pointer-events: none;
    }
  }

  .tooltip {
    color: var(--brandPrimaryTXT);
    border: 1px solid #c4c4c4;
    box-shadow: 1px 1px 1px #ddd;
    background: var(--exampleBoxBG);
    padding: 4px;
    position: absolute;
    max-width: 50rem;
    text-align: justify;
    display: flex;
    z-index: 99;

    @media only screen and (max-width: 1200px) {
      text-align: left !important;
    }
  }

  /*
  [data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 1.6em;
    width: 200%;
    font-size: 0.9em;
    padding: 2px 5px;
    left: 0;
    text-align: center;
    display: none;
    color: white;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    transition: opacity 0.1s ease-out;
    z-index: 99;
  }

  [data-tooltip]:hover::before {
    display: inline-block;
  }
  */
</style>
