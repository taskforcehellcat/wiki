<script>
  import { searchInUse } from '$lib/search/stores';

  // use ctrl + k to bring up search
  if (typeof window === 'object') {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        $searchInUse = true;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        $searchInUse = false;
      }
    });
  }
</script>

<slot />
