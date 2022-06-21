<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="erstehilfe" />
    <h1>Erste Hilfe</h1>

    <section id="Bergung">
      <p>Grundsätzlich gilt bei der Ersten Hilfe: Eigenschutz geht vor. Ein Risiko einzugehen, um einen Kameraden zu bergen oder zu versorgen, und dabei möglicherweise selbst verwundet zu werden, bringt die Mission nicht voran. Die Bergung muss mit großer Vorsicht und sehr guter Deckung erfolgen. Sie wird also auch nicht von einer Person alleine, sondern im Verband durchgeführt.</p>
    </section>

    <section id="Erstversorgung">
      <p>Damit Verwundete zielgerecht und effektiv versorgt werden können, verwenden wir zur groben Einteilung ein einfaches, dreistufiges System.</p>

      <section>
        <h3>Kat. Rot</h3>
        <p>Ein Ausfall der Kategorie Rot ist ein Verwundeter, der bewusstlos ist. Solche bedürfen dringender Aufmerksamkeit eines Sanitäters und müssen so schnell wie möglich geborgen und versorgt werden. Da ein Bewusstloser weder bei seiner eigenen Versorgung helfen, noch bei der Deckung mitwirken kann, und seine Versorgung obendrein sehr umständlich ist, sollte man sich gleich zu Beginn um Unterstützung bemühen. Es ist nicht unüblich, dass ein Bewusstloser von drei Soldaten versorgt und gedeckt werden muss, bis ein Sanitäter eintrifft.</p>
        <p>Nachdem geprüft wurde, ob der Bewusstlose noch einen Puls hat, ist die erste Priorität das Stoppen aller Blutungen. Gerade, wenn kein Sanitäter präsent ist, der Infusionen legen könnte, ist Blutverlust fatal. Auch, nachdem dies gelungen ist, muss der Verletzte regelmäßig überprüft werden, da sich Bandagen lösen können.</p>
        <p>Liegt kein Puls vor, sollte man mit einer Herz-Lungen-Wiederbelebung (HLW) fortsetzen. Diese muss auch durchweg bis zum Eintreffen des Sanitäters durchgeführt werden. Eine oder zwei Gaben Epinephrin können ebenso angebracht sein.</p>
        <p>Außerdem sollte der Kopf des Verletzten überstreckt werden, um die Sauerstoffversorgung zu gewährleisten.</p>

        <h3>Kat. Gelb</h3>
        <p>Ein Ausfall der Kategorie Gelb ist ein Verwundeter, der noch bei Bewusstsein ist. Hier gilt es, das Bewusstsein zu erhalten und nach Möglichkeit Gefechtsbereitschaft wiederherzustellen. Ein Kat. Gelb bedarf dennoch der Nachsorge eines Sanitäters, zum Beispiel um genäht zu werden oder für die adäquate Verordnung von Schmerzmitteln.</p>
        <p>Auch hier gilt es also, Blutungen zu stoppen. Wenn es sich nur um leichte bis mittlere Verletzungen handelt, sollte der Verwundete sich selbst versorgen, während er von einem Kameraden gedeckt wird. Droht allerdings hoher Blutverlust, sollte ein Kamerad bei der Selbstversorgung unterstützen. Ein Deckungselement ist dabei aber trotzdem erstrebenswert.</p>

        <h3>Kat. Grün</h3>
        <p>Kategorie Grün bedeutet Gefechtsbereitschaft. Dies wird meistens von einem Sanitäter bei abgeschlossener Nachsorge an die Truppführung gemeldet. Kategorie Grün beinhaltet genähte Verbände (kein Risiko der Öffnung) und höchstens milde Schmerzen.</p>
      </section>
    </section>

    <section id="Eintreffen des Sanitäters">
      <p>Auch der Sanitäter benötigt bei der weiteren Versorgung noch Unterstützung, mindestens um gedeckt zu werden. Bei dessen Eintreffen sollte man melden, welche Medikation man bereits verabreicht hat. Eventuell braucht der Sanitäter auch bei der Versorgung schwerer Verletzungen weiterhin Hilfe. Auch für die mögliche Verlegung eines Verwundeten sollte man verfügbar bleiben.</p>
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
