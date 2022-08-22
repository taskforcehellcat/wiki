<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';


	/* images */
	import sixteen_g from '$lib/images/sanitaeter/16g.png'
	import twenty_g from '$lib/images/sanitaeter/20g.png'
	import accuvac from '$lib/images/sanitaeter/accuvac.png'
	import adenosine from '$lib/images/sanitaeter/adenosine.png'
	import aed_x from '$lib/images/sanitaeter/aed_x.png'
	import amiodarone from '$lib/images/sanitaeter/amiodarone.png'
	import atropine from '$lib/images/sanitaeter/atropine.png'
	import bandagen from '$lib/images/sanitaeter/bandagen.png'
	import blood_iv from '$lib/images/sanitaeter/blood_iv.png'
	import blutgruppen from '$lib/images/sanitaeter/blutgruppen.png'
	import bodybag from '$lib/images/sanitaeter/bodybag.png'
	import carbonate from '$lib/images/sanitaeter/carbonate.png'
	import chest_seal from '$lib/images/sanitaeter/chest_seal.png'
	import defib from '$lib/images/sanitaeter/defib.png'
	import elastic_bandage from '$lib/images/sanitaeter/elastic_bandage.png'
	import epinephrine from '$lib/images/sanitaeter/epinephrine.png'
	import fast_io from '$lib/images/sanitaeter/fast_io.png'
	import field_dressing from '$lib/images/sanitaeter/field_dressing.png'
	import guedel from '$lib/images/sanitaeter/guedel.png'
	import infarkt from '$lib/images/sanitaeter/infarkt.png'
	import larynx_normal from '$lib/images/sanitaeter/larynx_normal.png'
	import lidocaine from '$lib/images/sanitaeter/lidocaine.png'
	import morphine from '$lib/images/sanitaeter/morphine.png'
	import naloxone from '$lib/images/sanitaeter/naloxone.png'
	import nitro from '$lib/images/sanitaeter/nitro.png'
	import norep from '$lib/images/sanitaeter/norep.png'
	import ondansetron from '$lib/images/sanitaeter/ondansetron.png'
	import packing_bandage from '$lib/images/sanitaeter/packing_bandage.png'
	import personal_aid_kit from '$lib/images/sanitaeter/personal_aid_kit.png'
	import phenylephrin from '$lib/images/sanitaeter/phenylephrin.png'
	import plasma_iv from '$lib/images/sanitaeter/plasma_iv.png'
	import pulseoximeter from '$lib/images/sanitaeter/pulseoximeter.png'
	import quickclot from '$lib/images/sanitaeter/quickclot.png'
	import saline_iv from '$lib/images/sanitaeter/saline_iv.png'
	import splint from '$lib/images/sanitaeter/splint.png'
	import stabilisierung from '$lib/images/sanitaeter/stabilisierung.png'
	import stethoscope from '$lib/images/sanitaeter/stethoscope.png'
	import surgical_airway_kit from '$lib/images/sanitaeter/surgical_airway_kit.png'
	import surgical_kit from '$lib/images/sanitaeter/surgical_kit.png'
	import tourniquet from '$lib/images/sanitaeter/tourniquet.png'
	import txa from '$lib/images/sanitaeter/txa.png'
	import wolf from '$lib/images/sanitaeter/wolf.png'
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="sanitaeter" />
		<h1>Sanitäter</h1>

		<p>
			<i>„Air goes in and out, blood goes round and round. Any deviation from that is a problem.“</i>
		</p>

		<section id="Zum Aufbau dieser Seite">
			<p>Die Arbeit des Sanitätsdienstes umfasst viele Aufgaben und erfordert ein recht breites Wissen. Vom Inhalt dieser Seite sollte man sich daher nicht erschlagen lassen.</p>
			<p>Die ersten beiden Abschnitte widmen sich der Stabilisierung von Kreislauf und Atmung. Ist die nämlich gelungen, steht es um einen Patienten meist schon gar nicht schlecht. Diese Abschnitte sind dabei in keiner speziellen Reihenfolge. Primäre Aufgabe der Blutzirkulation ist für unsere Zwecke der Transport von Sauerstoff im Körper. Ob Blutzirkulation ohne Atmung oder Atmung ohne Blutzirkulation, eines alleine genügt nicht. Bei der Behandlung muss man also beständig alle Vitalfunktionen im Blick behalten und sich der Situation des Patenten anpassen.</p>
			<p>Eine der ersten Dinge, die man als Sanitäter daher tun sollte, ist es, ein Pulsoximeter anzubringen. Dieses ermöglicht es einem, Puls und Sauerstoffsättigung des Blutes zu beobachten und schnell zu registrieren, welcher Bereich gerade die größere Aufmerksamkeit bedarf.</p>
			<p>
				<a href="#Grundausrüstung">Weiter unten</a> sind alle Ausrüstungsgegenstände einzeln aufgelistet und erklärt.
			</p>
			<p>
				Eine kompakte Zusammenfassung aller wichtigen Behandlungsschritte findet sich auch <a href="../">hier (DEAD LINK)</a>.
			</p>
		</section>

		<section id="Absichern der Atmung">
			<p>
				Die Atmung prüft man grundsätzlich am Kopf (genaueres zum Gebrauch des Medical Menus auch <a href="../erstehilfe#Lesen des Medical Menu" target="_blank">hier</a>). Eine der ersten Maßnahmen ist es, den Patienten in die stabile Seitenlage zu bringen (<i>establish recovery position</i>). Die Atemwege können teilweise oder vollständig verschlossen sein (<i>obstructed/occluded</i>). Ob dies der Fall ist, findet man mit der Option <i>check airways</i> heraus. Ist dies der Fall, verwendet man idealerweise den Accuvac, um die Atemwege frei zu machen und anschließend einen Larynx- oder Guedel-Tubus (<i>King LT / Guedel tube</i>). Sind diese nicht verfügbar, kann man die Atemwege mit geringerer Erfolgsaussicht auch händisch freimachen (<i>head turning</i>) und anschließend den Kopf überstrecken (<i>hyperextend head</i>). Ohne einen Tubus, der die Luftröhre offenhält, kann der Kopf allerdings verrutschen und diese Maßnahme muss eventuell häufiger durchgeführt werden.
			</p>
			<p>Wenn keine weiteren Komplikationen auftreten, sollten diese Schritte ausreichen, um die Atemwege zu stabilisieren.</p>

			<section id="Pneumothorax und Hämothorax">
				<p>Zu einem Pneumothorax (dt. „Luftbrust“) kommt es, wenn Luft durch eine Verletzung aus der Lunge entweicht und in den Zwischenraum von Lunge und Brustkorb gelangt. Diese Luft drückt dann von außen auf den Lungenflügel und hindert ihn daran, sich auszudehnen. Die Atmung ist dann sehr erschwert. Kann diese Luft gar nicht mehr entweichen, kommt es zu einem Spannungspneumothorax. Die Lunge kann sich dann gar nicht merh</p>
				<p>Bei einem Hämothorax kommt es zu Blutansammlungen im Brustkorb.</p>

				<section id="Diagnose">
					<p>
						Ein Stethoskop erlaubt es, den Brustkorb abzuhorchen (<i>auscultate lung sounds</i>). Anhand der Atemnebengeräusche (Rasseln oder Gurgeln) kann man abschätzen, ob ein Pneumo- oder Hämothorax vorliegt.
					</p>
				</section>

				<section id="Behandlung">
					<p>
						Zur Behandlung von Pneumo- und Hämothoraxen benötigt man Thoraxverschlusspflaster (<i>chest seals</i>) sowie eventuell AAT-Kits für Drainagen und Dekompressionen.
					</p>
					<p>
						Bei einem Pneumothorax kann direkt ein Thoraxverschlusspflaster auf die Wunde geklebt werden. Dieses hat ein Ein-Weg-Ventil, welches es Luft und Flüssigkeitsansammlungen gestattet, gegen den Lungendruck aus dem Brustkorb zu entweichen, den Brustkorb aber nach außen versiegelt. Liegt ein Spannungspneumothorax vor, muss <i>davor</i> eventuell eine Thoraxdekompression (<i>needle decompression</i>) durchgeführt werden.
					</p>
					<p>
						Bei einem Hämothorax muss zuvor eine Thoraxdrainage durchgeführt werden, um größere Mengen Flüssigkeit aus dem Lungenraum abzuführen. Dazu führt man eine Pleurapunktion (<i>drain fluid</i>) durch, bei der mit einer Nadel in die
						<span use:tooltip data-tooltip="der Raum zwischen Lungenflügel und Rippenfell">Pleurahöhle</span> gestochen wird.
					</p>
					<p>Die Anwendung des AAT-Kits kann fehlschlagen, man sollte daher nach jeder Behandlung noch einmal die Atemgeräusche abhorchen.</p>
				</section>
			</section>
		</section>

		<section id="Absichern des Kreislaufs">
			<p>Der erste Schritt der Kreislaufsicherung ist das Stoppen aller Blutungen. Grundsätzlich sind an alle verletzten Extremitäten Tourniquets anzulegen und anschließend Kopf und Torso zu verbinden und zu nähen. Danach sollte der Blutverlust ausgeglichen werden. An Gliedmaßen, an denen ein Tourniquet angelegt ist, kann weder ein Zugang gelegt werden noch Puls oder Blutsauerstoff gemessen werden. Man sollte also ein Körperteil komplett versorgen um über dieses schnell Flüssigkeit und Medikamente anlegen zu können. Ist der Blutverlust bereits enorm hoch und die Zeit dafür fehlt, kann man mit einer FAST IO auch einen Zugang am Torso etablieren. Dann ist es wahrscheinlich angebracht, die Vitalwerte direkt mit dem Defibrillator AED-X aufzunehmen, der ebenfalls am Torso angelegt wird. In jedem Falle ist es sinnvoll, sich zu merken, wo man den Zugang gelegt hat, um später unnötiges Suchen zu vermeiden.</p>
			<p>Ist der Patient weitgehend stabil, kann man die restlichen Körperteile versorgen und die Tourniquets entfernen.</p>
		</section>

		<section id="Grundausrüstung">
			<section id="Medikamente">
				<section>
					<h3>Basismedikamente</h3>
					<p>Medikamente, die als Autoinjektoren mitgeführt werden, bedürfen keines Zuganges für die Verabreichung und können daher auch von Nichtsanitätern angewandt werden.</p>
					<section>
						<h3>
							<span use:tooltip data-tooltip-img="{morphine}">Morphin-Autoinjektor</span>
						</h3>
						<p>unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
						<h3><span use:tooltip data-tooltip-img="">Painkillers</span> (dt. Schmerztabletten)</h3>
						<p>
							lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Sollten zur Behandlung leichter Schmerzen Morphin vorgezogen werden. Können auch von Soldaten eigenständig ohne größeres Risiko eingenommen werden. Kann bei versehentlicher Bluttransfusion mit falscher Blutgruppe lebensrettend wirken (siehe <a href="#Transfusionen im Feld">Transfusion von Blut</a>). Werden im Arsenal bei den Magazinen geführt.
						</p>
						<h3>
							<span use:tooltip data-tooltip-img="{epinephrine}">Epinephrin-Autoinjektor</span> (Adrenalin)
						</h3>
						<p>hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
						<h3>
							<span use:tooltip data-tooltip-img="{adenosine}">Adenosin-Autoinjektor</span>
						</h3>
						<p>senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
					</section>
				</section>

				<section>
					<h3>Infarkttherapie</h3>
					<section>
						<h3>
							<span use:tooltip data-tooltip-img="{amiodarone}">Amiodaron</span>
						</h3>
						<p>
							<span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>, bis zu 2,5 Mal so wirksam wie Lidokain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine
							<span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardie</span>. Empfohlen ist eine Gabe pro Patient.
						</p>
						<h3>
							<span use:tooltip data-tooltip-img="{lidocaine}">Lidokain</span>
						</h3>
						<p>
							<span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.
						</p>
						<h3>
							<span use:tooltip data-tooltip-img="{atropine}">Atropin</span>
						</h3>
						<p>
							zur Behandlung von <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardien</span>. Hebt die Herzrate wesentlich.
						</p>
					</section>
				</section>

				<section>
					<h3>Spezialisierte Medikationen</h3>
					<p>Die nachfolgenden Medikamente können in speziellen Situationen sehr nützlich sein, sind aber nicht essentiell und sollten daher nur in begrenzten Mengen mitgeführt werden. Im Zweifelsfall sollten stattdessen mehr Bandagen, Infusionsbeutel, Kanülen, etc. der Vorzug gegeben werden.</p>
					<section>
						<h3>
							<span use:tooltip data-tooltip-img="{carbonate}">Ammonium Carbonat</span>
						</h3>
						<p>
							<span use:tooltip data-tooltip="Inhalate werden durch Einatmen eingenommen (inhaliert)">Inhalat</span>, kann stabile Patienten (siehe
							<a href="#Vitalparameter">Kriterien an Stabilität</a>) aus der Bewusstlosigkeit holen. Wird am Kopf angewendet. Im Arsenal bei den Magazinen.
						</p>
						<h3>
							<span use:tooltip data-tooltip-img="{naloxone}">Naloxon</span>
						</h3>
						<p>
							Morphin-<span use:tooltip data-tooltip="dt. Gegenspieler. Antagonisten wirken einem bestimmten Medikament entgegen.">Antagonist</span>, genutzt zur Therapie von Morphin-Überdosierungen. Eine Gabe Naloxon hemmt die Wirkung einer Gabe Morphin. Verhindert negative Effekte durch Überdosierung, hebt aber auch die schmerzlindernde Wirkung von Morphin auf.
						</p>
						<h3>
							<span use:tooltip data-tooltip-img="{txa}">Tranexamsäure (TXA)</span>
						</h3>
						<p>treibt die Blutgerinnung voran und verbessert den Wundverschluss von Bandagen. Äquivalent zur Anwendung von QuikClot-Bandagen auf alle Körperteile, alle sechs Sekunden. Die Gesamtwirkdauer beträgt zwei Minuten.</p>
						<h3>
							<span use:tooltip data-tooltip-img="{norep}">Norepinephrin</span>
						</h3>
						<p>hebt den Blutdruck (Vasopressor). Wird über einen Zugang verabreicht.</p>
						<h3>
							<span use:tooltip data-tooltip-img="{nitro}">Nitroglycerin</span>
						</h3>
						<p>senkt den Blutdruck (Vasodepressor). Wird über einen Zugang verabreicht.</p>
						<h3>
							<span use:tooltip data-tooltip-img="{phenylephrin}">Phenylephrin</span>
						</h3>
						<p>hebt den Blutdruck bei gleichzeitiger Sekung des Pulses. Wird über einen Zugang verabreicht.</p>
						<h3>
							<span use:tooltip data-tooltip-img="{ondansetron}">Ondansetron</span>
						</h3>
						<p>verhindert, dass ein bewusstloser Patient sich übergibt. Nützlich, wenn die Atemwege nicht durch eine Güdel-Röhre o.Ä. gesichert werden können. Wird über einen Zugang verabreicht.</p>
					</section>
				</section>
			</section>

			<section id="Verbrauchsmaterialien">
				<p>Die folgenden Materialien sind zum einmaligen Gebrauch bestimmt.</p>
				<section>
					<h3>
						<span use:tooltip data-tooltip-img="{surgical_airway_kit}">AAT-Kit</span>
					</h3>
					<p>
						gebraucht zur Behandlung von Hämothoraxen (siehe <a href="#Pneumothorax und Hämothorax">Behandlung</a> von Hämothoraxen und Spannungspneumothoraxen).
					</p>
					<h3>
						<span use:tooltip data-tooltip-img="">Field Blood Transfusion Kit</span> (dt. Feldtransfusionsset)
					</h3>
					<p>
						erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Dabei muss auf die Kompatibilität der Blutgruppen geachtet werden, siehe dazu <a href="#Blutgruppenverträglichkeit">eine Tabelle von Blutgruppenverträglichkeiten</a>.
					</p>
					<h3>
						<span use:tooltip data-tooltip-img="{chest_seal}">Chest Seal</span>
						(dt. Thoraxverschlusspflaster)
					</h3>
					<p>
						ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe <a href="#Pneumothorax und Hämothorax">Behandlung</a> von Hämothoraxen und Spannungspneumothoraxen.
					</p>
					<h3><span use:tooltip data-tooltip-img="{sixteen_g}">16g IV</span></h3>
					<p>
						eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ" target="_blank">in diesem Video</a> anschaulich gezeigt wird.
					</p>
					<h3>
						<span use:tooltip data-tooltip-img="{fast_io}">FAST IO</span>
					</h3>
					<p>
						<i>First Access for Shock and Trauma IO,</i> ein
						<span use:tooltip data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.
					</p>
				</section>

				<section id="Bandagen">
					<p>Nebenstehende Tabelle zeigt die idealen Bandagen zur Behandlung verschiedener Wundentypen.</p>

					<a href="{bandagen}" class="no-underline" target="_blank"><img src="{bandagen}" alt="Übersicht mit Wunden- und Bandagentypen" /></a>
				</section>
			</section>

			<section id="Gebrauchsgegenstände">
				<p>Die folgenden Gegenstände sind zur Mehrfachverwendung geeignet.</p>

				<section>
					<h3>
						<span use:tooltip data-tooltip-img="{tourniquet}">Tourniquet</span>
					</h3>
					<p>
						Schnürt die Blutzufuhr eines Körperteils ab, um Blutverlust zu verhindern. <b>Achtung:</b> An Gliedmaßen mit Tourniquet kann kein Puls oder Blutdruck gemessen werden sowie keine Flüssigkeit angelegt werden. Außerdem heißt so ein absoluter Banger von Breaking Benjamin.
					</p>
					<p>Tourniquets sind essentiell zur Selbst- und Kameradenhilfe. Als Sanitäter sollte man seine Kameraden gelegentlich auffordern, zu prüfen, ob sie Tourniquets in ausreichender Anzahl mitführen und gegebenenfalls ausgleichen.</p>
					<h3>
						<h3>
							<span use:tooltip data-tooltip-img="{surgical_kit}">Nähset</span>
						</h3>
					</h3>
					<p>erlaubt das Nähen von Wunden. Genähte Verbände lösen sich nicht mehr.</p>
					<h3>
						<span use:tooltip data-tooltip-img="{stethoscope}">Stethoskop</span>
					</h3>
					<p>erlaubt die Diagnose von Thoraxverletzungen.</p>
					<h3>
						<span use:tooltip data-tooltip-img="{accuvac}">Accuvac</span>
					</h3>
					<p>
						erlaubt die <span use:tooltip data-tooltip="endo: innerhalb; trachea: Luftröhre">endotracheale</span>
						Absaugung von Erbrochenen und befreit so die Atemwege. Höhere Erfolgswahrscheinlichkeit als Ausrichten der Atemwege (<i>head turning</i>).
					</p>
					<h3>
						<span use:tooltip data-tooltip-img="{aed_x}">AED / AED-X</span>
					</h3>
					<p>
						<i>Automatisierter externer Defibrillator</i>. Zur Behandlung von
						<span use:tooltip data-tooltip="abnorme Herzrate (etwa Herzkammerflimmern)">Arryhthmien</span>, siehe auch <a href="#Herzinfarkt">Behandlung von Herzstillständen</a>. Die AED-X-Ausführung gestattet zusätzlich das Monitoring von
						<a href="sanitaeter#Vitalparameter">Vitalparametern</a>.
					</p>
					<h3>
						<span use:tooltip data-tooltip-img="{pulseoximeter}">Pulsoximeter</span>
					</h3>
					<p>
						erlaubt die Messung von Puls und des Sauerstoffgehalts des <span use:tooltip data-tooltip="peripher: außen, am Rande. Gemeint sind die Arme und Beine. Pulsoximeter messen an der Fingerkuppe.">peripheren</span>
						Blutes (engl. <i>saturation peripher O&#8322</i>, SpO&#8322). Siehe auch Abschnitt
						<a href="sanitaeter#Vitalparameter">Vitalparameter</a>.
					</p>
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
						<td>90 %</td>
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
					<li>
						Kat. Grün <b>Alpha</b>: Der Patient ist einschränkungslos gefechtsbereit / im bestmöglichen Zustand.
					</li>
					<li>
						Kat. Grün <b>Bravo</b>: Der Patient ist unwesentlich verletzt und bedarf keiner dringlichen sanitätsdienstlichen Fürsorge.
					</li>
				</ol>
				<div use:exampleBox>
					<p>Ein Patient, dessen Wunden versorgt, aber noch nicht genäht wurden, fällt in die Kategorie Grün-B. Wenn die Verwundungen allerdings so großflächig sind, dass sie bei Wiederöffnung problematisch werden könnten, ist die Kategorisierung Grün-B unangebracht.</p>
				</div>
				<li>
					<b>Kat. Gelb:</b> Der Patient benötigt zeitnah sanitätsdienstliche Unterstützung. Kat. Gelb sind allerdings noch bei Bewusstsein, können sich also noch wenigstens eingeschränkt selbst versorgen.
				</li>
				<ol style="list-style-type: lower-alpha;">
					<li>
						Kat. Gelb <b>Alpha</b>: Der Patient ist mittelschwer verwundet, ist nicht gefechtsbereit. Er muss gedeckt werden und ist eventuell immobilisiert. Es kann aber davon ausgegangen werden, dass der Patient noch innerhalb der nächsten zwei Minuten verlegt werden kann.
					</li>
					<li>
						Kat. Gelb <b>Bravo</b>: Der Patient ist so schwer verwundet, dass er droht, das Bewusstsein zu verlieren. Diese Kategorie ist charakterisiert durch hohe Blutverluste und großflächige Verletzungen.
					</li>
					<li>
						Kat. Gelb <b>Charlie</b>: Der Patient weißt zuzügliche Komplikationen auf, etwa einen Pneumothorax. Die voraussichtliche Behandlungszeit ist somit deutlich erhöht. Es muss davon ausgegangen werden, dass ein Kat. Gelb-C in einen Kat. Rot übergeht.
					</li>
				</ol>
				<li>
					<b>Kat. Rot</b>: Der Patient ist nicht bei Bewusstsein und kann sich daher nicht eigenversorgen. Entsprechend braucht er sofort Erste-Hilfe-Leistungen von Kameraden und sanitätsdienstliche Aufmerksamkeit.
				</li>
				<ol style="list-style-type: lower-alpha;">
					<li>
						Kat. Rot <b>Alpha</b>: Der Patient ist bewusstlos, aber vergleichsweise stabil und hat gute Überlebenschancen. Verwundungen lassen sich versorgen und die Vitalparameter lassen sich in einem unproblematischen Bereich halten.
					</li>
					<li>
						Kat. Rot <b>Bravo</b>: Der Patient schwebt in akuter Lebensgefahr. Dieser Zustand ist charakterisiert durch Vitalparameter im problematischen Bereich, etwa ein fehlender Puls.
					</li>
				</ol>
				<li>
					<b>Kat. Blau</b>: Eine Sonderkategorie, mit der bezeichnet wird, dass der Patient wahrscheinlich verloren ist.
				</li>
				<div use:exampleBox>
					<p>Fällt ein Truppenteil an einer Stelle im Feld aus, an der es nur unter nicht tragbaren Risiko geborgen werden kann, oder sind die Verletzungen so schwerwiegend, dass die Behandlung aus Sicht der Triage verantwortungslos wäre, fällt dies in die Kategorie Blau.</p>
				</div>
				<li>
					<b>Kat. Schwarz</b>:
					<span use:tooltip data-tooltip="der eingetretene Tod">Exitus letalis</span>.
				</li>
			</ol>
		</section>

		<section id="Verwundungen und Bandagen">
			<p>Idealerweise sollten Verletzung in Reihenfolge ihres Schweregrades behandelt werden:</p>
			<ol>
				<li>
					<b>Avulsionen</b>: (engl. <i>avulsion</i>) ein Gewebeausriss, etwa der Verlust eines Fingers. <br /><b>Starker Blutverlust, schwere Schmerzen</b>.
				</li>
				<li>
					<b>Splitterwirkung</b>: (engl. <i>velocity wound</i>) Verletzung durch Objekte mit hoher Geschwindigkeit, etwa Schrapnelln, Projektile, Splitter u.Ä. <br /><b>Moderater Blutverlust, schwere Schmerzen</b>.
				</li>
				<li>
					<b>Platzwunde</b>: (engl. <i>laceration</i>) Aufreißen der Haut durch Gewalteinwirkung eines stumpfen oder kantigen Gegenstandes. <br /><b>Moderater Blutverlust, leichte Schmerzen</b>.
				</li>
				<li>
					<b>Schnittwunde</b>: (engl. <i>cut wound</i>) Aufreißen der Haut durch Gewalteinwirkung eines scharfen Gegenstandes. <br /><b>Moderater Blutverlust, leichte Schmerzen</b>.
				</li>
				<li>
					<b>Punktion</b>: (engl. <i>puncture</i>) Stichverletzung. <br /><b>Leichter Blutverlust, leichte Schmerzen</b>.
				</li>
				<li>
					<b>Quetschwunde</b>: (engl. <i>crush wound</i>) Verletzung durch übermäßige Kompression des Gewebes. <br /><b>Sehr leichter Blutverlust, leichte Schmerzen</b>.
				</li>
				<li>
					<b>Schürfwunde</b>: (engl. <i>abrasion</i>) Abrieb der oberen Hautschicht. <br /><b>Sehr leichter Blutverlust, leichte Schmerzen</b>.
				</li>
				<li>
					<b>Prellung</b>: (engl. <i>contussion</i>) Verletzungen durch Gewalteinwirkung von außen ohne äußerliche Schädigung. <br /><b>Kein Blutverlust, kaum Schmerzen</b>.
				</li>
			</ol>
			<p>
				Die Wahl der idealen Bandage ist etwas kompliziert, unter <a href="#Bandagen">Bandagen</a> findet sich eine vereinfachte Tabelle mit Empfehlungen. Im Allgemeinen gilt, dass eine Elastische Bandage am schnellsten, aber unsichersten verschließt. Wenn die Wunde also zeitnah genäht werden kann, sind elastische Bandagen eine gute Wahl. Muss hingegen die Wunde möglichst lange von selbst verschlossen bleiben, empfiehlt sich QuikClot und ein Mullverband.
			</p>
		</section>

		<section id="Behandlungsroutinen">
			<section id="Empfohlene Routinechecks">
				<p>In ruhigen Momenten bietet es sich an, die Truppe dazu aufzufordern, individuell folgendes zu prüfen:</p>
				<ul>
					<li>
						<b>Sanitätsmaterial:</b> Sind noch genügend Bandagen vorhanden? Führt jeder ausreichend Tourniquets mit? Wie groß sind die Flüssigkeitsreserven der Truppe?
					</li>
					<li>
						<b>ungenähte Verbände:</b> Gibt es noch verbundene Wunden, die nicht genäht wurden?
					</li>
					<li>
						<b>Blutverlust:</b> Hat sich bei Truppenteilen ein Blutverlust aufsummiert, der schnell problematisch werden könnte? Sollten präventiv Infusionen gelegt werden?
					</li>
				</ul>
			</section>

			<section id="Stabilisierung">
				<p>Einen Überblick über die wichtigsten Stabilisierungsschritte liefert auch das nachfolgende Flowchart.</p>

				<a href="{stabilisierung}" target="_blank" class="no-underline"><img src="{stabilisierung}" alt="Flowchart Stabilisierung" /></a>
			</section>

			<section id="Herzinfarkt">
				<p>Einen groben Überblick über die wichtigesten Behandlungsschritte eines Herzinfarktes gibt das nachfolgende Flowchart.</p>

				<a href="{infarkt}" target="_blank" class="no-underline"><img src="{infarkt}" alt="Flowchart Herzstillstand" /></a>
			</section>

			<section id="Transfusionen im Feld">
				<p>
					Standardmäßig führen Sanitäter Blut der Blutgruppe 0- oder Plasma/Kochsalzlösung mit, welches also immer verträglich ist. Genügen diese Reserven nicht, kann im Feld Blut abgenommen werden, wenn ein <a href="#Verbrauchsmaterialien">Feldtransfusionsset</a>
					mitgeführt wird. Dabei ist allerdings die Kompatibilität von Spender- und Empfängerblut dringend zu beachten. Die Blutgruppe eines Kameraden steht auf seiner Marke (Kopf,
					<i>check dogtag</i>).
				</p>

				<section id="Blutgruppenverträglichkeit">
					<p>Man kann sich merken, dass dabei die Spenderblutgruppe gewissermaßen in der des Empfängers „enthalten“ sein muss (dabei steckt „-“ gewissermaßen in „+“). Möchte man herausfinden, ob ein Patient eine bestimmte Blutgruppe empfangen kann, testet man also, ob das Spenderblut in seine Blutgruppe „hineinpasst“.</p>

					<div use:exampleBox>
						<p>A- steckt zum Beispiel in diesem Sinne in AB+, A+ oder auch AB-, diese Blutgruppen können also A- empfangen. Es ist allerdings nicht enthalten in 0+, 0-, B+, etc. Diese Gruppen können also kein A- empfangen.</p>
						<p>AB+ kann beispielsweise jede Blutgruppe empfangen, 0- hingegen nur 0-.</p>
					</div>

					<p>Eine vollständige Übersicht liefert auch die nachfolgende Tabelle. Am besten sucht man sich selbst einige Paare aus und testet anhand der Tabelle das eben beschriebene Muster.</p>

					<a href="{blutgruppen}" target="_blank" class="no-underline"><img src="{blutgruppen}" alt="Tabelle Blutgruppenverträglichkeiten" /></a>

					<p>Eine ähnliche Tabelle kann auch ingame als Item mitgeführt und benutzt werden.</p>
				</section>

				<section id="Bei falscher Blutgruppengabe">
					<p>Dass die falsche Blutgruppe verabreicht worden ist, erkennt man in der Regel an einer rapide fallenden Herzrate. Das Klumpen der Blutkörperchen kann vermindert werden, indem Schmerztabletten in großer Anzahl verabreicht werden. Die Infusion muss natürlich sofort abgebrochen werden.</p>
				</section>
			</section>
		</section>

		<section id="Nützliche Hinweise">
			<ul>
				<li>
					Die Waffe muss sehr oft für medizinische Maßnahmen weggelegt werden, außerdem muss das Medical Menu häufig geöffnet werden. Möglicherweise ist es sinnvoll, <kbd>0</kbd> und
					<kbd>H</kbd> auf Maustasten zu legen, oder ähnliches.
				</li>
				<li>
					<kbd>G</kbd> liegt auf der Tastatur neben <kbd>H</kbd>. Da es fatal wäre, beim Versuch, das Medical Menu zu öffnen eine Granate zu werfen, sollte man sich überlegen, als Sanitäter
					<kbd>G</kbd>
					für Granaten zu unbinden und stattdessen zum Beispiel
					<kbd>SHIFT</kbd>+<kbd>G</kbd> zu verwenden.
				</li>
				<li>Gefangene müssen ebenfalls versorgt werden. Nachdem sie gefesselt wurden, können sie sich nicht mehr selbst verbinden, sollten sich ihre Bandagen lösen.</li>
				<li>Es ist sinnvoll, sich einzuprägen, wo man einen Zugang gelegt hat, um später unnötiges Suchen zu vermeiden. Am besten teilt man dies auch anderen Sanitätern mit, wenn sie einen Patienten übernehmen.</li>
			</ul>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">09.07.2022</svelte:fragment>
</Wiki>
