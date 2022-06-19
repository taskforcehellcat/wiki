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
        <h3>Medikamente</h3>

        <section>
          <h3>grundlegend</h3>
          <p><b>Morphin</b> unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
          <p><b>Epinephrin</b> (Adrenalin) hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
          <p><b>Adenosin</b> senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
        </section>

        <section>
          <h3>Infarkttherapie</h3>
          <p><b>Amiodaron</b> Antiarrythmetikum, bis zu 2,5 Mal so wirksam wie Lidokain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine Bradykardie. Empfohlen ist eine Gabe pro Patient.</p>
          <p><b>Lidokain</b> Antiarrythmetikum. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.</p>
          <p><b>Atropin</b> zur Behandlung von Bradykardien. Hebt die Herzrate wesentlich.</p>
        </section>

        <section>
          <h3>Verbrauchsmaterialien</h3>
          <p><b>AAT-Kit</b> gebraucht zur Behandlung von Hämothoraxen (siehe \ref//Behandlung:Haemothorax//) und Spannungspneumothoraxen (siehe \ref//Behandlung:Pneumothorax//).</p>
          <p><b>Field Blood Transfusion Kit</b> (dt. Feldtransfusionsset) erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Dabei muss auf die Kompatibilität der Blutgruppen geachtet werden, siehe dazu \ref//tab:Blutgruppen//.</p>
          <p><b>Chest Seal</b> (dt. Thoraxverschlusspflaster) ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe auch \ref//Behandlung:Pneumothorax// und \ref//Behandlung:Haemothorax//.</p>
          <p><b>16g IV</b> eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ">in diesem Video</a> anschaulich gezeigt wird.</p>
          <p><b>FAST IO</b> <i>First Access for Shock and Trauma IO,</i> ein <span data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.</p>
          <p><b>Painkillers</b> lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Werden im Arsenal bei den Magazinen geführt.</p>
        </section>
      </section>
      <p />
    </section>
  </svelte:fragment>
</Wiki>
