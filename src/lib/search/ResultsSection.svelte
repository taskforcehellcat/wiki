<script lang="ts">
  export let results;
  export let kind;

  let resultsOfKind = results.filter((hit) => {
    return hit.type == kind;
  });

  let hitCount = resultsOfKind.length;

  let pageTitle: string;

  switch (kind) {
    case 'page':
      pageTitle = 'Artikel';
      break;
    case 'heading':
      pageTitle = 'Abschnitte';
      break;
    case 'text':
      pageTitle = 'Textstellen';
      break;
    default:
      throw 'Value Error';
  }

  // correct for singulars
  if (hitCount == 1) {
    pageTitle = pageTitle.replace('Textstellen', 'Textstelle');
    pageTitle = pageTitle.replace('Abschnitte', 'Abschnitt');
  }
</script>

{#if hitCount !== 0}
  <div class="heading count">{hitCount}</div>
  <span class="heading">
    <span class="heading title">{pageTitle}</span> <span class="heading text">gefunden</span>
  </span>
  {#each resultsOfKind as hit}
    <span />
    <span class="breadcrumbs">
      {#each hit['breadcrumbs'] as crumb}
        <span><a href={crumb.link}>{crumb.display}</a></span><span class="material-icons seperator">chevron_right</span>
      {/each}
    </span>
  {/each}
{/if}

<style lang="scss">
  .heading.count {
    font-size: large;
    justify-self: right;
    margin-right: 1ch;
  }

  .breadcrumbs {
    color: var(--brandNeutral);
  }

  span.heading {
    font-size: large;
  }

  .heading.count {
    display: inline;
  }

  .breadcrumbs {
    color: var(--brandTertiaryTXT);
    display: block;
  }

  .breadcrumbs span a {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.12rem;
    text-decoration: none;

    color: var(--brandTertiaryTXT);
    transition: color 0.2s ease-out;
  }
  .breadcrumbs span a:hover {
    color: var(--navHover);
  }

  .breadcrumbs .seperator {
    vertical-align: middle;
  }
  .breadcrumbs:nth-last-child(2) {
    border: 2px solid blue;
  }
  /*.breadcrumbs .seperator:last-child {
    display: none;
  }*/
</style>
