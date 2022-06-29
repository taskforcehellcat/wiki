<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { tooltip, exampleBox } from "../wikitools";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="sanitaeter" />
    <h1>Sanitäter</h1>

    <p><i>„Air goes in and out, blood goes round and round. Any deviation from that is a problem.“</i></p>

    <section id="Grundausrüstung">
      <section id="Medikamente">
        <section>
          <h3>Basismedikamente</h3>
          <p>Medikamente, die als Autoinjektoren mitgeführt werden, bedürfen keines Zuganges für die Verabreichung und können daher auch von Nichtsanitätern angewandt werden.</p>
          <section>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\morphine.png">Morphin-Autoinjektor</span></h3>
            <p>unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
            <h3><span use:tooltip data-tooltip-img="">Painkillers</span> (dt. Schmerztabletten)</h3>
            <p>lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Sollten zur Behandlung leichter Schmerzen Morphin vorgezogen werden. Können auch von Soldaten eigenständig ohne größeres Risiko eingenommen werden. Kann bei versehentlicher Bluttransfusion mit falscher Blutgruppe lebensrettend wirken (siehe <a href="#Transfusionen im Feld">Transfusion von Blut</a>). Werden im Arsenal bei den Magazinen geführt.</p>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\epinephrine.png">Epinephrin-Autoinjektor</span> (Adrenalin)</h3>
            <p>hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\adenosine.png">Adenosin-Autoinjektor</span></h3>
            <p>senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
          </section>
        </section>

        <section>
          <h3>Infarkttherapie</h3>
          <section>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\amiodarone.png">Amiodaron</span></h3>
            <p><span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>, bis zu 2,5 Mal so wirksam wie Lidokain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardie</span>. Empfohlen ist eine Gabe pro Patient.</p>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\lidocaine.png">Lidokain</span></h3>
            <p><span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.</p>
            <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\atropine.png">Atropin</span></h3>
            <p>zur Behandlung von <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardien</span>. Hebt die Herzrate wesentlich.</p>
          </section>
        </section>

        <section>
          <h3>Spezialisierte Medikationen</h3>
          <p>Die nachfolgenden Medikamente können in speziellen Situationen sehr nützlich sein, sind aber nicht essentiell und sollten daher nur in begrenzten Mengen mitgeführt werden. Im Zweifelsfall sollten stattdessen mehr Bandagen, Infusionsbeutel, Kanülen, etc. der Vorzug gegeben werden.</p>
          <section>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/carbonate.png">Ammonium Carbonat</span></h3>
            <p><span use:tooltip data-tooltip="Inhalate werden durch Einatmen eingenommen (inhaliert)">Inhalat</span>, kann stabile Patienten (siehe <a href="#Vitalparameter">Kriterien an Stabilität</a>) aus der Bewusstlosigkeit holen. Wird am Kopf angewendet. Im Arsenal bei den Magazinen.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/naloxone.png">Naloxon</span></h3>
            <p>Morphin-<span use:tooltip data-tooltip="dt. Gegenspieler. Antagonisten wirken einem bestimmten Medikament entgegen.">Antagonist</span>, genutzt zur Therapie von Morphin-Überdosierungen. Eine Gabe Naloxon hemmt die Wirkung einer Gabe Morphin. Verhindert negative Effekte durch Überdosierung, hebt aber auch die schmerzlindernde Wirkung von Morphin auf.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/txa.png">Tranexamsäure (TXA)</span></h3>
            <p>treibt die Blutgerinnung voran und verbessert den Wundverschluss von Bandagen. Äquivalent zur Anwendung von QuikClot-Bandagen auf alle Körperteile, alle sechs Sekunden. Die Gesamtwirkdauer beträgt zwei Minuten.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/norep.png">Norepinephrin</span></h3>
            <p>hebt den Blutdruck (Vasopressor). Wird über einen Zugang verabreicht.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/nitro.png">Nitroglycerin</span></h3>
            <p>senkt den Blutdruck (Vasodepressor). Wird über einen Zugang verabreicht.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/phenylephrin.png">Phenylephrin</span></h3>
            <p>hebt den Blutdruck bei gleichzeitiger Sekung des Pulses. Wird über einen Zugang verabreicht.</p>
            <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/ondansetron.png">Ondansetron</span></h3>
            <p>verhindert, dass ein bewusstloser Patient sich übergibt. Nützlich, wenn die Atemwege nicht durch eine Güdel-Röhre o.Ä. gesichert werden können. Wird über einen Zugang verabreicht.</p>
          </section>
        </section>
      </section>

      <section id="Verbrauchsmaterialien">
        <p>Die folgenden Materialien sind zum einmaligen Gebrauch bestimmt.</p>
        <section>
          <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\surgical_airway_kit.png">AAT-Kit</span></h3>
          <p>gebraucht zur Behandlung von Hämothoraxen (siehe <a href="#Hämothorax">Behandlung von Hämothoraxen</a>) und Spannungspneumothoraxen (siehe <a href="#Spannungspneumothorax">Behandlung von Spannungsthoraxen</a>).</p>
          <h3><span use:tooltip data-tooltip-img="">Field Blood Transfusion Kit</span> (dt. Feldtransfusionsset)</h3>
          <p>erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Dabei muss auf die Kompatibilität der Blutgruppen geachtet werden, siehe dazu <a href="#Blutgruppenverträglichkeit">eine Tabelle von Blutgruppenverträglichkeiten</a>.</p>
          <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\chest_seal.png">Chest Seal</span> (dt. Thoraxverschlusspflaster)</h3>
          <p>ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe auch <a href="#Hämothorax">Behandlung von Hämothoraxen</a> und <a href="#Spannungspneumothorax">Behandlung von Spannungsthoraxen</a>.</p>
          <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\16g.png">16g IV</span></h3>
          <p>eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ" target="_blank">in diesem Video</a> anschaulich gezeigt wird.</p>
          <h3><span use:tooltip data-tooltip-img=".\images\wiki\sani\fast_io.png">FAST IO</span></h3>
          <p><i>First Access for Shock and Trauma IO,</i> ein <span use:tooltip data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.</p>
        </section>

        <section id="Bandagen">
          <p>Nebenstehende Tabelle zeigt die idealen Bandagen zur Behandlung verschiedener Wundentypen.</p>

          <img src=".\images\wiki\sani\wallpapers\bandagen.png" alt="Übersicht mit Wunden- und Bandagentypen">

        </section>
      </section>

      <section id="Gebrauchsgegenstände">

        <p>Die folgenden Gegenstände sind zur Mehrfachverwendung geeignet.</p>

        <section>
          <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/tourniquet.png">Tourniquet</span></h3>
          <p>Schnürt die Blutzufuhr eines Körperteils ab, um Blutverlust zu verhindern. <b>Achtung:</b> An Gliedmaßen mit Tourniquet kann kein Puls oder Blutdruck gemessen werden sowie keine Flüssigkeit angelegt werden. Außerdem heißt so ein absoluter Banger von Breaking Benjamin.</p>
          <p>Tourniquets sind essentiell zur Selbst- und Kameradenhilfe. Als Sanitäter sollte man seine Kameraden gelegentlich auffordern, zu prüfen, ob sie Tourniquets in ausreichender Anzahl mitführen und gegebenenfalls ausgleichen.</p>
          <h3><h3><span use:tooltip data-tooltip-img="./images/wiki/sani/surgical_kit.png">Nähset</span></h3></h3>
          <p>erlaubt das Nähen von Wunden. Genähte Verbände lösen sich nicht mehr.</p>
          <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/stethoscope.png">Stethoskop</span></h3>
          <p>erlaubt die Diagnose von Thoraxverletzungen.</p>
          <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/accuvac.png">Accuvac</span></h3>
          <p>erlaubt die <span use:tooltip data-tooltip="endo: innerhalb; trachea: Luftröhre">endotracheale</span> Absaugung von Erbrochenen und befreit so die Atemwege. Höhere Erfolgswahrscheinlichkeit als Ausrichten der Atemwege (<i>head turning</i>).</p>
          <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/aed_x.png">AED / AED-X</span></h3>
          <p><i>Automatisierter externer Defibrillator</i>. Zur Behandlung von <span use:tooltip data-tooltip="abnorme Herzrate (etwa Herzkammerflimmern)">Arryhthmien</span>, siehe auch <a href="#Herzinfarkt">Behandlung von Herzstillständen</a>. Die AED-X-Ausführung gestattet zusätzlich das Monitoring von <a href="/sanitaeter#Vitalparameter">Vitalparametern</a>.</p>
          <h3><span use:tooltip data-tooltip-img="./images/wiki/sani/pulseoximeter.png">Pulsoximeter</span></h3>
          <p>erlaubt die Messung von Puls und des Sauerstoffgehalts des <span use:tooltip data-tooltip="peripher: außen, am Rande. Gemeint sind die Arme und Beine. Pulsoximeter messen an der Fingerkuppe.">peripheren</span> Blutes (engl. <i>saturation peripher O&#8322</i>, SpO&#8322). Siehe auch Abschnitt <a href="/sanitaeter#Vitalparameter">Vitalparameter</a>.</p>
        </section>
      </section>
    </section>

    <section id="Vitalparameter">
      <section id="Idealwerte">
        <p>Ein vollständig gesunder Patient sollte die folgenden Werte aufweisen:</p>

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

      <section id="Extremwerte">
        <p>Unterschreitung „minimaler stabiler“ Werte führt zu Bewusstlosigkeit, Unterschreitung „kritischer“ Werte zum Tod.</p>
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

      <section id="Einschätzen des Blutvolumens">
        <p />

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

    <section id="Meldesystem">
      <p>Im Feld wird mit einem abkürzenden Meldesystem gearbeitet, das es erleichtern soll, kurz und prägnant den Zustand von Patienten zu kommunizieren. Dabei wird zunächst eine grobe Einteilung in die Kategorien Grün, Gelb, Rot und Schwarz geliefert und diese Einteilung gegebenenfalls noch präzisiert. Im Allgemeinen geschieht dies mehr nach Bachgefühl als strengen Definitionen, um im Feld schnell und flexibel agieren zu können.</p>
      <ol>
        <li><b>Kat. Grün:</b> Der Patient ist gefechtsbereit.</li>
        <ol style="list-style-type: lower-alpha;">
          <li>Kat. Grün <b>Alpha</b>: Der Patient ist einschränkungslos gefechtsbereit / im bestmöglichen Zustand.</li>
          <li>Kat. Grün <b>Bravo</b>: Der Patient ist unwesentlich verletzt und bedarf keiner dringlichen sanitätsdienstlichen Fürsorge.</li>
        </ol>
        <div use:exampleBox><p>Ein Patient, dessen Wunden versorgt, aber noch nicht genäht wurden, fällt in die Kategorie Grün-B. Wenn die Verwundungen allerdings so großflächig sind, dass sie bei Wiederöffnung problematisch werden könnten, ist die Kategorisierung Grün-B unangebracht.</p></div>
        <li><b>Kat. Gelb:</b> Der Patient benötigt zeitnah sanitätsdienstliche Unterstützung. Kat. Gelb sind allerdings noch bei Bewusstsein, können sich also noch wenigstens eingeschränkt selbst versorgen.</li>
        <ol style="list-style-type: lower-alpha;">
          <li>Kat. Gelb <b>Alpha</b>: Der Patient ist mittelschwer verwundet, ist nicht gefechtsbereit. Er muss gedeckt werden und ist eventuell immobilisiert. Es kann aber davon ausgegangen werden, dass der Patient noch innerhalb der nächsten zwei Minuten verlegt werden kann.</li>
          <li>Kat. Gelb <b>Bravo</b>: Der Patient ist so schwer verwundet, dass er droht, das Bewusstsein zu verlieren. Diese Kategorie ist charakterisiert durch hohe Blutverluste und großflächige Verletzungen.</li>
          <li>Kat. Gelb <b>Charlie</b>: Der Patient weißt zuzügliche Komplikationen auf, etwa einen Pneumothorax. Die voraussichtliche Behandlungszeit ist somit deutlich erhöht. Es muss davon ausgegangen werden, dass ein Kat. Gelb-C in einen Kat. Rot übergeht.</li>
        </ol>
        <li><b>Kat. Rot</b>: Der Patient ist nicht bei Bewusstsein und kann sich daher nicht eigenversorgen. Entsprechend braucht er sofort Erste-Hilfe-Leistungen von Kameraden und sanitätsdienstliche Aufmerksamkeit.</li>
        <ol style="list-style-type: lower-alpha;">
          <li>Kat. Rot <b>Alpha</b>: Der Patient ist bewusstlos, aber vergleichsweise stabil und hat gute Überlebenschancen. Verwundungen lassen sich versorgen und die Vitalparameter lassen sich in einem unproblematischen Bereich halten.</li>
          <li>Kat. Rot <b>Bravo</b>: Der Patient schwebt in akuter Lebensgefahr. Dieser Zustand ist charakterisiert durch Vitalparameter im problematischen Bereich, etwa ein fehlender Puls.</li>
        </ol>
        <li><b>Kat. Blau</b>: Eine Sonderkategorie, mit der bezeichnet wird, dass der Patient wahrscheinlich verloren ist.</li>
        <div use:exampleBox><p>F"allt ein Truppenteil an einer Stelle im Feld aus, an der es nur unter nicht tragbaren Risiko geborgen werden kann, oder sind die Verletzungen so schwerwiegend, dass die Behandlung aus Sicht der Triage verantwortungslos wäre, fällt dies in die Kategorie Blau.</p></div>
        <li><b>Kat. Schwarz</b>: <span use:tooltip data-tooltip="der eingetretene Tod">Exitus letalis</span>.</li>
      </ol>
    </section>

    <section id="Verwundungen">
      <p>Idealerweise sollten Verletzung in Reihenfolge ihres Schweregrades behandelt werden:</p>
      <ol>
        <li><b>Avulsionen</b>: (engl. <i>avulsion</i>) ein Gewebeausriss, etwa der Verlust eines Fingers.</li>
        <li>...  </li>
      </ol></section>

    <section id="Behandlungsroutinen">

      <section id="Empfohlene Routinechecks">

        <p>In ruhigen Momenten bietet es sich an, die Truppe dazu aufzufordern, individuell folgendes zu prüfen:</p>
        <ul>
          <li><b>Sanitätsmaterial:</b> Sind noch genügend Bandagen vorhanden? Führt jeder ausreichend Tourniquets mit? Wie groß sind die Flüssigkeitsreserven der Truppe?</li>
          <li><b>ungenähte Verbände:</b> Gibt es noch verbundene Wunden, die nicht genäht wurden?</li>
          <li><b>Blutverlust:</b> Hat sich bei Truppenteilen ein Blutverlust aufsummiert, der schnell problematisch werden könnte? Sollten präventiv Infusionen gelegt werden?</li>
        </ul>
      </section>

      <section id="Stabilisierung">
        <p>Einen Überblick über die wichtigsten Stabiliierungsschritte liefert auch das nachfolgende Flowchart.</p>

        <img src=".\images\wiki\sani\wallpapers\stabilisierung.png" alt="Flowchart Stabilisierung">

      </section>

      <section id="Herzinfarkt">

        <p>Einen groben Überblick über die wichtigesten Behandlungsschritte eines Herzinfarktes gibt das nachfolgende Flowchart.</p> 

        <img src=".\images\wiki\sani\wallpapers\infarkt.png" alt="Flowchart Herzstillstand">
      </section>
      <section id="Hämothorax"></section>

      <section id="Spannungspneumothorax"></section>

      <section id="Transfusionen im Feld">
        <p>Transfusionen von Blut sind im Feld möglich, wenn ein <a href="#Verbrauchsmaterialien">Feldtransfusionsset</a> mitgeführt wird. Dabei ist allerdings die Kompatibilität von Spender- und Empfängerblut dringend zu beachten.</p>

        <section id="Blutgruppenverträglichkeit">

        </section>

        <section id="Bei falscher Blutgruppengabe">

        </section>
      </section>
    </section>

    
  </svelte:fragment>
  <svelte:fragment slot="editdate">29.06.2022</svelte:fragment>
</Wiki>
