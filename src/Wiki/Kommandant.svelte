<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="kommandant" />
    <h1>Kommandant (Panzertruppe)</h1>

    <section id="Rollenprofil">
      <p>Der Kommandant hat die Befehlsgewalt und trägt die Verantwortung für sein Fahrzeug und die dazugehörige Besatzung. Seine Priorität ist der Erhalt der Gefechtsbereitschaft seines Fahrzeuges durch adäquate Führung.</p>
    </section>

    <section id="Aufgabenbereich">
      <p>Der Kommandant nimmt unmittelbar Einfluss auf das Verhalten seines Fahrzeuges und seiner Besatzung.</p>

      <ol>
        <li>Herstellung der Gefechtsbereitschaft</li>
        <li>Anweisungen zur Bewegung des Fahrzeuges an den Fahrer</li>
        <li>Anweisungen zur Bedienung der Waffensysteme an den Richtschützen</li>
        <li>Funkverkehr innerhalb seines Zuges</li>
        <li>Aktives Aufklären und Wahrung von Situationsbewusstsein</li>
      </ol>
    </section>
  </svelte:fragment>
</Wiki>
