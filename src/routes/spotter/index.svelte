<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
  <svelte:fragment slot="content">
    <article id="spotter" />
    <h1>Spotter</h1>

    <section id="Rollenprofil">
      <p />
    </section>
    <section id="Aufgaben">
      <p />
    </section>
    <section id="Ausrüstung">
      <p />
    </section>
    <section id="Fertigkeiten">
      <p />
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
