<script lang="ts">
  export let type: 'info' | 'warning' | 'error' | 'success' = 'info';
  export let dismissible: boolean = false;

  let visible = true;
</script>

{#if visible}
  <div class="notice notice--{type}" role="alert">
    <div class="notice__content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true">
        {#if type === 'info'}
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.399l-.502.002-.026-.12L8.005 6.5h.96l-.03.088zm.01-2.764a.802.802 0 1 1 0 1.604.802.802 0 0 1 0-1.604z" />
        {:else if type === 'warning'}
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        {:else if type === 'error'}
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        {:else if type === 'success'}
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        {/if}
      </svg>
      <slot />
    </div>

    {#if dismissible}
      <button
        class="notice__close"
        on:click={() => (visible = false)}
        aria-label="Schließen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true">
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .notice {
    width: min(110rem, 100%);
    position: relative;
    padding: 0.75rem 1.5rem;
    margin-bottom: 2.5rem;
    border: 1px solid;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0 10px;
    font-weight: 500;
  }

  .notice--info {
    background-color: var(--color-info-bg);
    border-color: var(--color-info-border);
    color: var(--color-info-text);
  }

  .notice--warning {
    background-color: var(--color-warning-bg);
    border-color: var(--color-warning-border);
    color: var(--color-warning-text);
  }

  .notice--error {
    background-color: var(--color-error-bg);
    border-color: var(--color-error-border);
    color: var(--color-error-text);
  }

  .notice--success {
    background-color: var(--color-success-bg);
    border-color: var(--color-success-border);
    color: var(--color-success-text);
  }

  .notice__content {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .notice__close {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: inherit;
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    transition: color 0.15s ease;
  }

  .notice--info .notice__close:hover {
    color: var(--color-info-hover);
  }

  .notice--warning .notice__close:hover {
    color: var(--color-warning-hover);
  }

  .notice--error .notice__close:hover {
    color: var(--color-error-hover);
  }

  .notice--success .notice__close:hover {
    color: var(--color-success-hover);
  }

  .notice__close svg {
    width: 28px;
    height: 28px;
  }
</style>
