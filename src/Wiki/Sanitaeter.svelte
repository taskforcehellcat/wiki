<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { tooltip } from "../tooltip";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="sanitaeter" />
    <h1>Sanitäter</h1>

    <p><b>Seite im Aufbau.</b></p>

    <section id="Grundausrüstung">
      <section>
        <h2>Medikamente</h2>

        <section>
          <h3>Basismedikamente</h3>
          <p>Medikamente, die als Autoinjektoren mitgeführt werden, bedürfen keines Zuganges für die Verabreichung und können daher auch von Nichtsanitätern angewandt werden.</p>
          <section>
            <h3>Morphin-Autoinjektor</h3>
            <p>unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
            <h3>Painkillers (dt. Schmerztabletten)</h3>
            <p>lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Sollten zur Behandlung leichter Schmerzen Morphin vorgezogen werden. Können auch von Soldaten eigenständig ohne größeres Risiko eingenommen werden. Kann bei versehentlicher Bluttransfusion mit flascher Blutgruppe lebensrettend wirken (siehe <a href="">Transfusion von Blut (DEAD LINK)</a>). Werden im Arsenal bei den Magazinen geführt.</p>
            <h3>Epinephrin-Autoinjektor (Adrenalin)</h3>
            <p>hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
            <h3>Adenosin-Autoinjektor</h3>
            <p>senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
          </section>
        </section>

        <section>
          <h3>Infarkttherapie</h3>
          <section>
            <h3>Amiodaron</h3>
            <p><span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>, bis zu 2,5 Mal so wirksam wie Lidokain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardie</span>. Empfohlen ist eine Gabe pro Patient.</p>
            <h3>Lidokain</h3>
            <p><span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.</p>
            <h3>Atropin</h3>
            <p>zur Behandlung von <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardien</span>. Hebt die Herzrate wesentlich.</p>
          </section>
        </section>

        <section>
          <h3>Spezialisierte Medikationen</h3>
          <p>Die nachfolgenden Medikamente können in speziellen Situationen sehr nützlich sein, sind aber nicht essentiell und sollten daher nur in begrenzten Mengen mitgeführt werden. Im Zweifelsfall sollten stattdessen mehr Bandagen, Infusionsbeutel, Kanülen, etc. der Vorzug gegeben werden.</p>
          <section>
            <h3>Ammonium Carbonat</h3>
            <p><span use:tooltip data-tooltip="Inhalate werden durch Einatmen eingenommen (inhaliert)">Inhalat</span>, kann stabile Patienten (siehe <a href="/sanitaeter#Vitalparameter">Kriterien an Stabilität</a>) aus der Bewusstlosigkeit holen. Wird am Kopf angewendet. Im Arsenal bei den Magazinen.</p>
            <h3>Naloxon</h3>
            <p>Morphin-<span use:tooltip data-tooltip="dt. Gegenspieler. Antagonisten wirken einem bestimmten Medikament entgegen.">Antagonist</span>, genutzt zur Therapie von Morphin-Überdosierungen. Eine Gabe Naloxon hemmt die Wirkung einer Gabe Morphin. Verhindert negative Effekte durch Überdosierung, hebt aber auch die schmerzlindernde Wirkung von Morphin auf.</p>
            <h3>Tranexamsäure (TXA)</h3>
            <p>treibt die Blutgerinnung voran und verbessert den Wundverschluss von Bandagen. Äquivalent zur Anwendung von QuikClot-Bandagen auf alle Körperteile, alle sechs Sekunden. Die Gesamtwirkdauer beträgt zwei Minuten.</p>
            <h3>Norepinephrin-?Autoinjektor?</h3>
            <p>hebt den Blutdruck (Vasopressor).</p>
            <h3>Niroglycerin</h3>
            <p>senkt den Blutdruck (Vasodepressor).</p>
            <h3>Phenylephrin</h3>
            <p>hebt den Blutdruck bei gleichzeitiger Sekung des Pulses.</p>
          </section>
        </section>
      </section>

      <section>
        <h3>Verbrauchsmaterialien</h3>
        <section>
          <h3>AAT-Kit</h3>
          <p>gebraucht zur Behandlung von Hämothoraxen (siehe <a href="">Behandlung von Hämothoraxen (DEAD LINK)</a>) und Spannungspneumothoraxen (siehe <a href="">Behandlung von Spannungsthoraxen (DEAD LINK)</a>).</p>
          <h3>Field Blood Transfusion Kit (dt. Feldtransfusionsset)</h3>
          <p>erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Dabei muss auf die Kompatibilität der Blutgruppen geachtet werden, siehe dazu <a href="">eine Tabelle von Blutgruppenkompatibilitäten (DEAD LINK)</a>.</p>
          <h3>Chest Seal (dt. Thoraxverschlusspflaster)</h3>
          <p>ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe auch <a href="">Behandlung von Hämothoraxen (DEAD LINK)</a> und <a href="">Behandlung von Spannungsthoraxen (DEAD LINK)</a>.</p>
          <h3>16g IV</h3>
          <p>eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ">in diesem Video</a> anschaulich gezeigt wird.</p>
          <h3>FAST IO</h3>
          <p><i>First Access for Shock and Trauma IO,</i> ein <span use:tooltip data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.</p>
        </section>
      </section>

      <section>
        <h3>Werkzeug</h3>
        <section>
          <h3>Stethoskop</h3>
          <p>erlaubt die Diagnose von Thoraxverletzungen.</p>
          <h3>Accuvac</h3>
          <p>erlaubt die <span use:tooltip data-tooltip="endo: innerhalb; trachea: Luftröhre">endotracheale</span> Absaugung von Erbrochenen und befreit so die Atemwege. Höhere Erfolgswahrscheinlichkeit als Ausrichten der Atemwege (<i>head turning</i>).</p>
          <h3>AED / AED-X</h3>
          <p><i>Automatisierter externer Defibrillator</i>. Zur Behandlung von <span use:tooltip data-tooltip="abnorme Herzrate (etwa Herzkammerflimmern)">Arryhthmien</span>, siehe auch <a href="">Behandlung von Herzstillständen (DEAD LINK)</a>. Die AED-X-Ausführung gestattet zusätzlich das Monitoring von <a href="/sanitaeter#Vitalparameter">Vitalparametern</a>.</p>
          <h3>Pulsoximeter</h3>
          <p>erlaubt die Messung von Puls und des Sauerstoffgehalts des <span use:tooltip data-tooltip="peripher: außen, am Rande. Gemeint sind die Arme und Beine. Pulsoximeter messen an der Fingerkuppe.">peripheren</span> Blutes (engl. <i>saturation peripher O&#8322</i>, SpO&#8322). Siehe auch Abschnitt <a href="/sanitaeter#Vitalparameter">Vitalparameter</a>.</p>
        </section>
      </section>
    </section>

    <section id="Vitalparameter">
      <section>
        <h3>Idealwerte</h3>
        Ein vollständig gesunder Patient sollte die folgenden Werte aufweisen:

        <table>
          <tr>
            <td><b>Herzrate:</b></td>
            <td>80 (46 bis 119 ist bei bewussten Patienten relativ sicher)</td>
          </tr>
          <tr>
            <td><b>Blutdruck:</b></td>
            <td>120 / 80 mmHg</td>
          </tr>
          <tr>
            <td><b>Sauerstoffsättigung:</b></td>
            <td>100 %</td>
          </tr>
        </table>

        <!--
        <p><b>Herzrate:</b> 80 (46 bis 119 ist bei bewussten Patienten relativ sicher)</p>
        <p><b>Blutdruck:</b> 120 / 80 mmHg</p>
        <p><b>Sauerstoffsättigung:</b> 100 %</p>
        -->
      </section>

      <section>
        <h3>Extremwerte</h3>
        Unterschreitung „minimaler stabiler“ Werte führt zu Bewusstlosigkeit, Unterschreitung „kritischer“ Werte zum Tod.
        <table>
          <tr>
            <td><b>Kritische Sauerstoffsättigung:</b></td>
            <td>65 %</td>
          </tr>
          <tr>
            <td><b>Minimale stabile Sauerstoffsättigung:</b></td>
            <td>85 %</td>
          </tr>
          <tr>
            <td><b>Minimale stabile Herzrate:</b></td>
            <td>40</td>
          </tr>
          <tr>
            <td><b>Minimales stabiles Blutvolumen:</b></td>
            <td>5,1 Liter (<i>„lost some blood“</i>)</td>
          </tr>
          <tr>
            <td><b>Kritisches Blutvolumen:</b></td>
            <td>3 Liter</td>
          </tr>
        </table>

        <!--  
        <p><b>Kritische Sauerstoffsättigung:</b> 65 %, weniger führt zum Tod</p>
        <p><b>Minimale stabile Sauerstoffsättigung:</b> 85 %</p>
        <p><b>Minimale stabile Herzrate:</b> 40</p>
        <p><b>Minimales stabiles Blutvolumen:</b> 5,1 Liter (<i>„lost some blood“</i>)</p>
        <p><b>Kritisches Blutvolumen:</b> 3 Liter</p>
        -->
      </section>

      <section>
        <h3>Einschätzen des Blutvolumens</h3>

        <table>
          <tr>
            <th>Statuseffekt</th>
            <th>Blutvolumen</th>
          </tr>
          <tr>
            <td><i>„lost some blood“</i></td>
            <td>5,1 bis 6 Liter</td>
          </tr>
          <tr>
            <td><i>„lost a lot of blood“</i></td>
            <td>4,2 bis 5,1 Liter</td>
          </tr>
          <tr>
            <td><i>„lost a large amount of blood“</i></td>
            <td>3,6 bis 4,2 Liter</td>
          </tr>
          <tr>
            <td><i>„lost a fatal amount of blood“</i></td>
            <td>0 bis 3,6 Liter</td>
          </tr>
        </table>
      </section>
    </section>

    <section id="Behandlungsroutinen" />
  </svelte:fragment>
</Wiki>
