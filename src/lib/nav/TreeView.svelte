<script lang="ts">
  import type { Article, Directory } from '../../app';
  import { resolve } from '$app/paths';

  export let menu: Array<Directory> = [];
  let expandedId: string | null = null;
  let focusedId: string | null = null;

  function visibleIds(): string[] {
    const ids: string[] = [];
    for (const dir of menu) {
      ids.push(dir.id);
      if (expandedId === dir.id) {
        for (const article of dir.entries) {
          ids.push(`${dir.id}/${article.id}`);
        }
      }
    }
    return ids;
  }

  function toggle(id: string) {
    expandedId = expandedId === id ? null : id;
  }

  function shortName(article: Article) {
    return article.meta.title_short || article.meta.title;
  }

  function focusItem(id: string) {
    focusedId = id;
    document
      .querySelector<HTMLElement>(`[data-treeid="${CSS.escape(id)}"]`)
      ?.focus();
  }

  function handleDirKeydown(e: KeyboardEvent, dir: Directory) {
    const ids = visibleIds();
    const idx = ids.indexOf(dir.id);
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggle(dir.id);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (idx < ids.length - 1) focusItem(ids[idx + 1]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (idx > 0) focusItem(ids[idx - 1]);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (expandedId !== dir.id) {
          expandedId = dir.id;
        } else if (dir.entries.length > 0) {
          focusItem(`${dir.id}/${dir.entries[0].id}`);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (expandedId === dir.id) expandedId = null;
        break;
      case 'Home':
        e.preventDefault();
        if (ids.length > 0) focusItem(ids[0]);
        break;
      case 'End':
        e.preventDefault();
        if (ids.length > 0) focusItem(ids[ids.length - 1]);
        break;
    }
  }

  function handleLeafKeydown(
    e: KeyboardEvent,
    dir: Directory,
    article: Article
  ) {
    e.stopPropagation();
    const itemId = `${dir.id}/${article.id}`;
    const ids = visibleIds();
    const idx = ids.indexOf(itemId);
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        (e.currentTarget as HTMLElement)
          .querySelector<HTMLAnchorElement>('a')
          ?.click();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (idx < ids.length - 1) focusItem(ids[idx + 1]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (idx > 0) focusItem(ids[idx - 1]);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusItem(dir.id);
        break;
      case 'Home':
        e.preventDefault();
        if (ids.length > 0) focusItem(ids[0]);
        break;
      case 'End':
        e.preventDefault();
        if (ids.length > 0) focusItem(ids[ids.length - 1]);
        break;
    }
  }

  function tabindexFor(id: string): 0 | -1 {
    if (focusedId !== null) return focusedId === id ? 0 : -1;
    return menu[0]?.id === id ? 0 : -1;
  }
</script>

<ul role="tree" class="tree-view">
  {#each menu as dir (dir.id)}
    <li
      role="treeitem"
      aria-expanded={expandedId === dir.id}
      aria-selected={focusedId === dir.id}
      tabindex={tabindexFor(dir.id)}
      data-treeid={dir.id}
      class="tree-view__item"
      class:tree-view__item--open={expandedId === dir.id}
      on:keydown={(e) => handleDirKeydown(e, dir)}
      on:focus={() => (focusedId = dir.id)}>
      <button on:click={() => toggle(dir.id)} tabindex="-1">
        {dir.config.title}
        <i class="material-icons-round noselect" aria-hidden="true">
          expand_more
        </i>
      </button>
      {#if expandedId === dir.id}
        <ul role="group" class="tree-view__group">
          {#each dir.entries as article (article.id)}
            <li
              role="treeitem"
              aria-selected={focusedId === `${dir.id}/${article.id}`}
              tabindex={tabindexFor(`${dir.id}/${article.id}`)}
              data-treeid={`${dir.id}/${article.id}`}
              class="tree-view__leaf"
              on:keydown={(e) => handleLeafKeydown(e, dir, article)}
              on:focus={() => (focusedId = `${dir.id}/${article.id}`)}>
              <a href={resolve(`/${dir.id}/${article.id}`)} tabindex="-1">
                {shortName(article)}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>
