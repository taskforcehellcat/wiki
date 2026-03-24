<script lang="ts">
  let wipBanner: HTMLDivElement;

  function closeWIP() {
    wipBanner.style.display = 'none';
  }
</script>

<div id="wip-banner" bind:this={wipBanner}>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-exclamation-triangle-fill"
      viewBox="0 0 16 16"
      aria-hidden="true">
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
    Diese Seite ist noch in Bearbeitung!
  </div>

  <button class="wip-close" on:click={closeWIP} aria-label="Banner schließen">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-x"
      viewBox="0 0 16 16"
      aria-hidden="true">
      <path
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  </button>
</div>

<style>
  #wip-banner {
    width: min(110rem, 100%);
    height: 5rem;
    position: relative;
    padding: 0.75rem 1.5rem;
    margin-bottom: 2.5rem;
    border: 1px solid #f0d78c;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #92710c;
    background-color: #fef9e7;
    gap: 0 10px;
    font-weight: 500;
  }

  #wip-banner > div {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .wip-close {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: inherit;
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    transition: background-color 0.15s ease;
  }

  .wip-close:hover {
    background-color: rgba(133, 100, 4, 0.1);
  }

  .wip-close svg {
    width: 28px;
    height: 28px;
  }
</style>
