<script>
  import { page } from '$app/stores';
  import { resolve } from '$app/paths';
</script>

<div class="error-page">
  <h1>Fehler {$page.status}</h1>

  {#if $page.status == 404}
    <p>Diese Seite existiert nicht.</p>
  {/if}

  {#if $page.status == 500}
    <p>
      Irgendwas ist bei uns schiefgelaufen, das hätte nicht passieren sollen.
    </p>
    <p>
      Sag uns gerne, wie du hier hier gelandet bist, damit wir das Problem
      beheben können: <a
        href="https://discord.com/channels/629333468299526164/1021556229857882182"
        target="_blank"
        rel="noreferrer">
        Feedback-Forum auf Discord
      </a>
    </p>
  {/if}

  <a class="back-link" href={resolve('/')}>Zurück zur Startseite</a>
</div>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 4rem 2rem;
    gap: 1.5rem;
    color: var(--color-text-muted);
  }

  .error-page h1 {
    font-size: var(--font-size-h1);
    font-weight: 650;
    color: var(--color-neutral);
    letter-spacing: -0.01em;
  }

  .error-page p {
    font-size: 1.3rem;
    line-height: 1.6;
    max-width: 50rem;
    text-align: center;
  }

  .error-page a:not(.back-link) {
    color: var(--color-link, #436adf);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .back-link {
    margin-top: 1rem;
    padding: 0.8rem 2rem;
    border: 1px solid var(--color-border-muted);
    border-radius: 0.5rem;
    color: var(--color-text-muted);
    font-weight: 500;
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .back-link:hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: var(--color-neutral);
    border-color: var(--color-text-muted);
  }
</style>
