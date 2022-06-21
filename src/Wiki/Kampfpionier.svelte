<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { tooltip } from "../tooltip";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="kampfpionier" />
    <h1>Kampfpionier</h1>
    <section id="Rollenprofil">
      <p>Der Kampfpionier trägt die Verantwortung, den Schutz der eigenen Truppen zu verbessern und dadurch deren Überlebensfähigkeit zu erhöhen.</p>
    </section>
    <section id="Aufgaben">
      <p>Die Aufgaben eines Kampfpioniers variieren je nach Mission & Situation. Die Hauptaufgaben lassen sich aber in wenigen Punkten grob zusammenfassen.</p>
      <ul>
        <li>Die Instandsetzung von Boden- und Luftfahrzeugen</li>
        <li>Die Instandsetzung von Infrastruktur, als auch das verstärken und befestigen militärisch genutzter Einrichtungen durch bauliche Maßnahmen</li>
        <li>Das befördern von außerstand-gesetzten Fahrzeugen</li>
        <li>Das Aufklären und entschärfen von sowohl <span use:tooltip data-tooltip="Anti-personnel (Antipersonen)">AP</span>- & <span use:tooltip data-tooltip="Anti-tank (Panzerabwehr)">AT</span>-Minen</li>
        <li>Das bedienen von <span use:tooltip data-tooltip="Unmanned ground vehicle">UGV</span> & <span use:tooltip data-tooltip="Unmanned aerial vehicle">UAV</span> Dronen</li>
      </ul>
    </section>
    <section id="Fertigkeiten">
      <ul>
        <li>Erweiterte Kenntnisse über eigene Fahrzeuge</li>
        <li>Bedienung von Ausrüstung wie Toolkits, Minen-detektoren, Dronen & Minenräumungs-werkzeugen</li>
      </ul>
    </section>
    <section id="Weiteres">
      <p>Kampfpionier immer halal</p>
    </section>
  </svelte:fragment>
</Wiki>
