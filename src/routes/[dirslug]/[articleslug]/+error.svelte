<script>
  import { page } from '$app/stores';
</script>

<h1>Fehler {$page.status}: {$page.error?.message}</h1>

{#if $page.status == 404}
  <p>Diesen Artikel konnten wir nicht finden.</p>
  <p>
    Wenn du glaubst, er sollte existieren, lass es uns wissen: <a
      href="https://discord.com/channels/629333468299526164/1021556229857882182"
      target="_blank"
      rel="noreferrer">Feedback-Forum auf Discord</a
    >
  </p>
{/if}

{#if $page.status == 500}
  <p>Irgendwas ist bei uns schiefgelaufen, das hätte nicht passieren sollen.</p>
  <p>
    Sag uns gerne, wie du hier hier gelandet bist, damit wir das Problem beheben
    können: <a
      href="https://discord.com/channels/629333468299526164/1021556229857882182"
      target="_blank"
      rel="noreferrer">Feedback-Forum auf Discord</a
    >
  </p>
{/if}
