<script>
  let wipBanner;

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
    >
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      />
    </svg>Diese Seite ist noch in Bearbeitung!
  </div>

  <svg
    on:click={closeWIP}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-x"
    viewBox="0 0 16 16"
  >
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
</div>

<style>
  #wip-banner {
    width: min(110rem, 100%);
    height: 5rem;
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 2.5rem;
    border: 1px solid transparent;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    gap: 0 10px;
  }

  #wip-banner > div {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  #wip-banner > svg:last-child {
    width: 28px;
    height: 28px;
  }

  #wip-banner > svg:last-child:hover {
    cursor: pointer;
  }
</style>
