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
    <span /><span class="search__pageresults">
      {#each hit['breadcrumbs'] as crumb}
        <span class="article"><a href={crumb.link}>{crumb.display}</a></span><span class="material-icons seperator">chevron_right</span>
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
  .search__hits {
    color: var(--brandNeutral);
  }

  .article {
    color: var(--brandNeutral);
  }
  .search__pageresults {
    color: var(--brandSecondaryTXT);
    border: 10px solid red;
  }

  span.heading {
    font-size: large;
  }

  .heading.count {
    display: inline;
  }

  .search__pageresults {
    display: block;
  }
  .search__pageresults span a {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.12rem;
    text-decoration: none;

    color: var(--brandTertiaryTXT);
    transition: color 0.2s ease-out;
  }
  .search__pageresults span a:hover {
    color: var(--navHover);
  }
  .search__pageresults .seperator {
    vertical-align: middle;
  }
  .search__pageresults .seperator:last-child {
    display: none;
  }
</style>
