<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';


	/* images */
	import blutgruppen from '$lib/images/sanitaeter/blutgruppen.png'
	import bodybag from '$lib/images/sanitaeter/bodybag.png'
	import infarkt from '$lib/images/sanitaeter/infarkt.png'
	import stabilisierung from '$lib/images/sanitaeter/stabilisierung.png'
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="behandlungen" />
		<h1>Behandlungen</h1>

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
						<td><b>Minimale stabile Sauerstoffsättigung:</b></td>
						<td>90 % SpO&#8322;</td>
					</tr>
					<tr>
						<td><b>Kritische Sauerstoffsättigung:</b></td>
						<td>65 % SpO&#8322;</td>
					</tr>
					<tr>
						<td><b>Minimale stabile Herzrate:</b></td>
						<td>40 bpm</td>
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

		

		<section id="Stabilisierung">
			<p>Einen Überblick über die wichtigsten Stabilisierungsschritte liefert auch das nachfolgende Flowchart. Es bezieht sich auf eine ältere Version von KAT Medical und sollte daher nicht ganz wörtlich genommen werden. Es wird demnächst aktualisiert.</p>

			<a href="{stabilisierung}" target="_blank" class="no-underline"><img src="{stabilisierung}" alt="Flowchart Stabilisierung" /></a>
		</section>

		<section id="Herzinfarkt">
			<p>Einen groben Überblick über die wichtigesten Behandlungsschritte eines Herzinfarktes gibt das nachfolgende Flowchart.  Es bezieht sich auf eine ältere Version von KAT Medical und sollte daher nicht ganz wörtlich genommen werden. Es wird demnächst aktualisiert.</p>

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

	</svelte:fragment>
	<svelte:fragment slot="editdate">09.07.2022</svelte:fragment>
</Wiki>
