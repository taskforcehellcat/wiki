<script lang="ts">
  import { updateSearchResults } from "../../public/scripts/search_backend/search";
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="sanitaeter" />
    <h1>Sanitäter</h1>

    Seite im Aufbau.

    <section id="Grundausrüstung">
      <section>
        <h2>Medikamente</h2>

        <section>
          <h3>Grundlegend</h3>
          <section>
            <h3>Morphin</h3>
            <p>unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
            <h3>Epinephrin (Adrenalin)</h3>
            <p>hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
            <h3>Adenosin</h3>
            <p>senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
          </section>
        </section>

        <section>
          <h3>Infarkttherapie</h3>
          <section>
            <h3>Amiodaron</h3>
            <p>Ein Antiarrythmetikum, bis zu 2,5 Mal so wirksam wie Lidokain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine Bradykardie. Empfohlen ist eine Gabe pro Patient.</p>
            <h3>Lidokain</h3>
            <p>Antiarrythmetikum. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.</p>
            <h3>Atropin</h3>
            <p>zur Behandlung von Bradykardien. Hebt die Herzrate wesentlich.</p>
          </section>
        </section>

        <section>
          <h3>Verbrauchsmaterialien</h3>
          <section>
            <h3>AAT-Kit</h3>
            <p>gebraucht zur Behandlung von Hämothoraxen (siehe \ref//Behandlung:Haemothorax//) und Spannungspneumothoraxen (siehe \ref//Behandlung:Pneumothorax//).</p>
            <h3>Field Blood Transfusion Kit (dt. Feldtransfusionsset)</h3>
            <p>erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Dabei muss auf die Kompatibilität der Blutgruppen geachtet werden, siehe dazu \ref//tab:Blutgruppen//.</p>
            <h3>Chest Seal (dt. Thoraxverschlusspflaster)</h3>
            <p>ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe auch \ref//Behandlung:Pneumothorax// und \ref//Behandlung:Haemothorax//.</p>
            <h3>16g IV</h3>
            <p>eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ">in diesem Video</a> anschaulich gezeigt wird.</p>
            <h3>FAST IO</h3>
            <p><i>First Access for Shock and Trauma IO,</i> ein <span data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.</p>
            <h3>Painkillers</h3>
            <p>lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Werden im Arsenal bei den Magazinen geführt.</p>
          </section>
        </section>
      </section>
    </section>
  </svelte:fragment>
</Wiki>
