<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { tooltip, exampleBox } from "../wikitools";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="erstehilfe" />
    <h1>Erste Hilfe</h1>

    <p>Dass Kameraden im Feld verwundet werden, lässt sich kaum vermeiden. Daher ist es umso wichtiger, in solch einer Situation zu wissen, wie man richtig handelt.</p>

    <section id="Versorgungsmaterial">
      <p>Um eine Grundversorgung gewährleisten zu können, sollte das folgende Material immer mitgeführt werden:</p>

      <ul>
        <li>Bandagen: Mullverband (<i>packing bandage</i>) min. 15 Stück, elastische Bandagen: min. 10 Stück</li>
        <li>Medikamente: Morphin: 1 Autoinjektor, Epinephrin: 2 Autoinjektoren, Schmerztabletten: 2 Schachteln (20 Tabletten)</li>
        <li>Tourniquets: 4 Stück</li>
        <li>Splints: 2 Stück</li>
        <li>Flüssigkeiten: 500 bis 1000 ml Kochsalzlösung (<i>saline solution</i>)</li>
        <li>Pulsoximeter: 1 Stück</li>
      </ul>

      <p>Die Standardloadouts zum Beispiel sind ausreichend ausgestattet.</p>
    </section>

    <section id="Melden">
      <p>Der Patientenstatus wird mit einer der folgenden Kategorien angegeben:</p>
      <ul>
        <li><b>Kat. Grün:</b> der Patient ist vollkommen einsatzbereit</li>
        <li><b>Kat. Gelb:</b> der Patient ist verwundet, aber bei Bewusstsein</li>
        <li><b>Kat. Rot:</b> der Patient ist schwer verwundet oder bewusstlos</li>
        <li><b>Kat. Schwarz:</b> der Patient ist nicht am Leben</li>
      </ul>

      <div use:exampleBox>
        <p>Ein Schütze bemerkt, dass ein Truppmitglied neben ihm stürzt und bewusstlos ist. Er funkt an den Truppführer:</p>
        <p><i>„Linke Flanke ein Ausfall, Kat. Rot - kommen.“</i></p>
      </div>
    </section>

    <section id="Hilfeleistung">
      <p>Der Standardkeybind zum Öffnen des <span use:tooltip data-tooltip-img="./images/wiki/ace_medical_menu.png">Medical Menu</span> ist <kbd>H</kbd>. Dabei muss man den Patienten ansehen. <b>Achtung:</b> Im Medical Menu sollte der Name des Patienten zu sehen sein! Andernfalls hat man versehentlich das eigene Medical Menu geöffnet.</p>

      <section id="Lesen des Medical Menus">
        <img alt="ACE Medical Menu" src="./images/wiki/ace_medical_menu.png" class="noselect" />

        <ul>
          <li>Spalte <b>Status</b>: Je dunkler der Rotton eines Körperteils, desto größeren Blutverlust verursacht es. Blaue Körperteile sind versorgt, aber noch nicht genäht. Es besteht die Gefahr, dass sich diese Bandagen wieder öffnen. Zum Nähen muss ein Sanitäter aufgesucht werden. Ein unverletztes oder endversorgtes Körperteil erscheint weiß.</li>
          <li>Spalte <b>Overview</b>: Hier sieht man die Verwundungen.</li>
          <li>Spalte <b>Examine and Treatment</b>: Hier sieht man die Behandlungsoptionen und kann sie ausführen. Diese Spalte hat weitere Reiter, unter denen die jeweiligen Behandlungen kategorisiert sind. Das kann anfangs verwirrend sein.</li>
        </ul>
      </section>

      <section id="Behandeln ansprechbarer Patienten">
        <ol>
          <h3>im Gefecht</h3>
          <li>Tourniquet an blutende Gliedmaßen anlegen (am Torso und Kopf ist das nicht möglich)</li>
          <li>Kopf und Torso verbinden, stärkere Verwundungen priorisieren</li>
          <li>bei Schmerzen Schmerztabletten verwenden</li>
          <li>Splint anlegen <i>wenn nötig</i>. Splints, die von Nichtsanitätern angelegt worden sind, lösen sich mit einer gewissen Wahrscheinlichkeit wieder.</li>

          <h3>nach dem Gefecht</h3>
          <li>verletzte Gliedmaßen bandagieren</li>
          <li>Tourniquets abnehmen</li>
          <li>Sanitäter zum Nähen lassen aufsuchen (möglichst zeitnah)</li>
        </ol>
      </section>

      <section id="Behandeln bewusstloser Patienten">
        <section id="Bergung">
          <p>Grundsätzlich gilt bei der Ersten Hilfe: Eigenschutz geht vor. Ein Risiko einzugehen, um einen Kameraden zu bergen oder zu versorgen, und dabei möglicherweise selbst verwundet zu werden, bringt die Mission nicht voran. Die Bergung muss mit großer Vorsicht und sehr guter Deckung erfolgen. Sie wird also auch nicht von einer Person alleine, sondern im Verband durchgeführt.</p>
        </section>

        <section id="Handlungsablauf">
          <ol>
            <li>Im Medical Menu überprüfen, ob der Patient gezogen/getragen werden kann. Wenn nicht (Reiter <i>Drag/Carry</i> ist ausgegraut), ist der Patient tot. Ansonsten:</li>
            <li>Tourniquet an blutende Gliedmaßen anlegen (am Torso und Kopf ist das nicht möglich)</li>
            <li>Kopf und Torso verbinden, stärkere Verwundungen priorisieren</li>
            <li>Atemwege überprüfen:</li>
            <ol>
              <li>verstopft/verschlossen (<i>occluded/obstructed</i>): Kopf ausrichten (<i>head turning</i>) bis befreit</li>
              <li>Kopf überstrecken (<i>hyperextend head</i>), damit die Zunge nicht die Atemwege verschließen kann</li>
            </ol>
            <li>Puls prüfen:</li>
            <ol>
              <li>kein Puls: Herz-Lungen-Wiederbelebung (<i>CPR</i>) dauerhaft durchführen, Epinephrin verabreichen, Sanitäter alamieren. Auch die Atemwege weiterhin prüfen.</li>
              <li>Puls vorhanden: nach kurzer Zeit wieder prüfen, da er verschwinden könnte. Nächster Schritt.</li>
            </ol>
            <li>in stabile Seitenlage bringen (<i>use recovery position</i>)</li>
            <li>verbleibende Verletzungen bandagieren und Tourniquets entfernen</li>
          </ol>
        </section>

        <section id="Eintreffen des Sanitäters">
          <p>Auch der Sanitäter benötigt bei der weiteren Versorgung noch Unterstützung, mindestens um gedeckt zu werden. Bei dessen Eintreffen sollte man melden, welche Medikation man bereits verabreicht hat. Eventuell braucht der Sanitäter auch bei der Versorgung schwerer Verletzungen weiterhin Hilfe, zum Beispiel für die Herz-Lungen-Widerbelebung bei einem Herzstillstand. Auch für die mögliche Verlegung eines Verwundeten sollte man verfügbar bleiben.</p>
        </section>
      </section>
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">23.06.2022</svelte:fragment>
</Wiki>
