<script lang="ts">
  import type { TreeItem } from '../../app';
  import { page } from '$app/state';

  export let items: TreeItem[] = [];
  export let onLinkClick: (() => void) | undefined = undefined;

  let expandedId: string | null = null;
  let focusedId: string | null = null;

  $: if (page.params?.dirslug) {
    expandedId = page.params.dirslug;
  }

  function visibleIds(): string[] {
    const ids: string[] = [];
    for (const item of items) {
      ids.push(item.id);
      if (item.children && expandedId === item.id) {
        for (const child of item.children) {
          ids.push(`${item.id}/${child.id}`);
        }
      }
    }
    return ids;
  }

  function toggle(id: string) {
    expandedId = expandedId === id ? null : id;
  }

  function focusItem(id: string) {
    focusedId = id;
    document
      .querySelector<HTMLElement>(`[data-treeid="${CSS.escape(id)}"]`)
      ?.focus();
  }

  function handleItemKeydown(e: KeyboardEvent, item: TreeItem) {
    const ids = visibleIds();
    const idx = ids.indexOf(item.id);

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (item.children) {
          toggle(item.id);
        } else {
          (e.currentTarget as HTMLElement)
            .querySelector<HTMLAnchorElement>('a')
            ?.click();
        }
        break;
      case ' ':
        if (item.children) {
          e.preventDefault();
          toggle(item.id);
        }
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
        if (item.children) {
          e.preventDefault();
          if (expandedId !== item.id) {
            expandedId = item.id;
          } else if (item.children.length > 0) {
            focusItem(`${item.id}/${item.children[0].id}`);
          }
        }
        break;
      case 'ArrowLeft':
        if (item.children) {
          e.preventDefault();
          if (expandedId === item.id) expandedId = null;
        }
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
    item: TreeItem,
    child: { id: string }
  ) {
    e.stopPropagation();
    const childId = `${item.id}/${child.id}`;
    const ids = visibleIds();
    const idx = ids.indexOf(childId);
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
        focusItem(item.id);
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
    return items[0]?.id === id ? 0 : -1;
  }
</script>

<ul role="tree" class="tree-view">
  {#each items as item (item.id)}
    {#if item.children}
      <li
        role="treeitem"
        aria-expanded={expandedId === item.id}
        aria-selected={focusedId === item.id}
        tabindex={tabindexFor(item.id)}
        data-treeid={item.id}
        class="tree-view__item"
        class:tree-view__item--open={expandedId === item.id}
        on:keydown={(e) => handleItemKeydown(e, item)}
        on:focus={() => (focusedId = item.id)}>
        <button on:click={() => toggle(item.id)} tabindex="-1">
          {item.label}
          <i class="material-icons-round noselect" aria-hidden="true">
            expand_more
          </i>
        </button>
        {#if expandedId === item.id}
          <ul role="group" class="tree-view__group">
            {#each item.children as child (child.id)}
              <li
                role="treeitem"
                aria-selected={focusedId === `${item.id}/${child.id}`}
                tabindex={tabindexFor(`${item.id}/${child.id}`)}
                data-treeid={`${item.id}/${child.id}`}
                class="tree-view__leaf"
                on:keydown={(e) => handleLeafKeydown(e, item, child)}
                on:focus={() => (focusedId = `${item.id}/${child.id}`)}>
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                <a
                  href={child.href}
                  tabindex="-1"
                  class:active={page.params?.dirslug === item.id &&
                    page.params?.articleslug === child.id}
                  on:click={onLinkClick}>
                  {child.label}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {:else}
      <li
        role="treeitem"
        aria-selected={focusedId === item.id}
        tabindex={tabindexFor(item.id)}
        data-treeid={item.id}
        class="tree-view__link"
        on:keydown={(e) => handleItemKeydown(e, item)}
        on:focus={() => (focusedId = item.id)}>
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={item.href} tabindex="-1" on:click={onLinkClick}>
          {item.label}
        </a>
      </li>
    {/if}
  {/each}
</ul>
