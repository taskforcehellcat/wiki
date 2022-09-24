<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';


	/* images */
	import bandagen from '$lib/images/sanitaeter/bandagen.png'
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
			<p>Einen Überblick über die wichtigsten Stabilisierungsschritte liefert das nachfolgende Flowchart. Es bezieht sich auf eine ältere Version von KAT Medical und sollte daher nicht ganz wörtlich genommen werden. Es wird demnächst aktualisiert.</p>

			<a href="{stabilisierung}" target="_blank" class="no-underline"><img src="{stabilisierung}" alt="Flowchart Stabilisierung" /></a>

			<p>Bei der Stabilisierung ist es wichtig, Atmung und Kreislauf gleichermaßen im Blick zu behalten. Daher empfiehlt es sich, früh ein Pulsoximeter anzubringen um Sauerstoffsättigung des Blutes und Herzrate gleichzeitig und schnell ablesen zu können.</p>
		</section>

		<section id="Absichern der Atmung">
			<p>
				Die Atmung prüft man grundsätzlich am Kopf (genaueres zum Gebrauch des Medical Menus auch <a href="../erstehilfe#lesen_des_medical_menus" target="_blank">hier</a>). Eine der ersten Maßnahmen ist es, den Patienten in die stabile Seitenlage zu bringen (<i>establish recovery position</i>). Die Atemwege können teilweise oder vollständig verschlossen sein (<i>obstructed/occluded</i>). Ob dies der Fall ist, findet man mit der Option <i>check airways</i> heraus. Ist dies der Fall, verwendet man idealerweise den Accuvac, um die Atemwege frei zu machen und anschließend einen Larynx- oder Guedel-Tubus (<i>King LT / Guedel tube</i>). Sind diese nicht verfügbar, kann man die Atemwege mit geringerer Erfolgsaussicht auch händisch freimachen (<i>head turning</i>) und anschließend den Kopf überstrecken (<i>hyperextend head</i>). Ohne einen Tubus, der die Luftröhre offenhält, kann der Kopf allerdings verrutschen und diese Maßnahme muss eventuell häufiger durchgeführt werden.
			</p>
			<p>Wenn keine weiteren Komplikationen auftreten, sollten diese Schritte ausreichen, um die Atemwege zu stabilisieren. Komplikationen, die bei der Atmung auftreten können sind Hämothorax und Pneumothorax, <a href="#pneumothorax_und_haemothorax">siehe unten</a>.</p>
		</section>

		<section id="Absichern des Kreislaufs">
			<p>Der erste Schritt der Kreislaufsicherung ist das Stoppen aller Blutungen. Grundsätzlich sind an alle verletzten Extremitäten Tourniquets anzulegen und anschließend Kopf und Torso zu verbinden und zu nähen. Danach sollte der Blutverlust ausgeglichen werden. An Gliedmaßen, an denen ein Tourniquet angelegt ist, kann weder ein Zugang gelegt werden noch Puls oder Blutsauerstoff gemessen werden. Man sollte also ein Körperteil komplett versorgen um über dieses schnell Flüssigkeit und Medikamente anlegen zu können. Ist der Blutverlust bereits enorm hoch und die Zeit dafür fehlt, kann man mit einer FAST IO auch einen Zugang am Torso etablieren. Dann ist es wahrscheinlich angebracht, die Vitalwerte direkt mit dem Defibrillator AED-X aufzunehmen, der ebenfalls am Torso angelegt wird. In jedem Falle ist es sinnvoll, sich zu merken, wo man den Zugang gelegt hat, um später unnötiges Suchen zu vermeiden.</p>
			<p>Ist der Patient weitgehend stabil, kann man die restlichen Körperteile versorgen und die Tourniquets entfernen.</p>
			<p>Eine Komplikation, die bei der Versorgung des Kreislaufes auftreten kann, ist der <a href="#herzinfarkt">Herzstillstand</a>.</p>
		</section>

		<section id="Verwundungen">
			<p>Idealerweise sollten Verletzung in Reihenfolge ihres Schweregrades behandelt werden:</p>
			<ol>
				<li>
					<b>Avulsionen</b>: (engl. <i>avulsion</i>) ein Gewebeausriss, etwa der Verlust eines Fingers. <br />Starker Blutverlust, schwere Schmerzen.
				</li>
				<li>
					<b>Splitterwirkung</b>: (engl. <i>velocity wound</i>) Verletzung durch Objekte mit hoher Geschwindigkeit, etwa Schrapnelln, Projektile, Splitter u.Ä. <br />Moderater Blutverlust, schwere Schmerzen.
				</li>
				<li>
					<b>Platzwunde</b>: (engl. <i>laceration</i>) Aufreißen der Haut durch Gewalteinwirkung eines stumpfen oder kantigen Gegenstandes. <br />Moderater Blutverlust, leichte Schmerzen.
				</li>
				<li>
					<b>Schnittwunde</b>: (engl. <i>cut wound</i>) Aufreißen der Haut durch Gewalteinwirkung eines scharfen Gegenstandes. <br />Moderater Blutverlust, leichte Schmerzen.
				</li>
				<li>
					<b>Punktion</b>: (engl. <i>puncture</i>) Stichverletzung. <br />Leichter Blutverlust, leichte Schmerzen.
				</li>
				<li>
					<b>Quetschwunde</b>: (engl. <i>crush wound</i>) Verletzung durch übermäßige Kompression des Gewebes. <br />Sehr leichter Blutverlust, leichte Schmerzen.
				</li>
				<li>
					<b>Schürfwunde</b>: (engl. <i>abrasion</i>) Abrieb der oberen Hautschicht. <br />Sehr leichter Blutverlust, leichte Schmerzen.
				</li>
				<li>
					<b>Prellung</b>: (engl. <i>contussion</i>) Verletzungen durch Gewalteinwirkung von außen ohne äußerliche Schädigung. <br />Kein Blutverlust, kaum Schmerzen.
				</li>
			</ol>
			<p>
				Die Wahl der idealen Bandage ist etwas kompliziert, unter <a href="#bandagen">Bandagen</a> findet sich eine vereinfachte Tabelle mit Empfehlungen. Im Allgemeinen gilt, dass eine Elastische Bandage am schnellsten, aber unsichersten verschließt. Wenn die Wunde also zeitnah genäht werden kann, sind elastische Bandagen eine gute Wahl. Muss hingegen die Wunde möglichst lange von selbst verschlossen bleiben, empfiehlt sich QuikClot und ein Mullverband.
			</p>
		</section>

		<section id="Verbrennungen">
			<i>Aktuell nicht Behandelbar, folgt in künftigen ACE/KAT Updates.</i>
		</section>

		<section id="Bandagen">
			<p>Nebenstehende Tabelle zeigt die idealen Bandagen zur Behandlung verschiedener Wundentypen.</p>

			<a href="{bandagen}" class="no-underline" target="_blank"><img src="{bandagen}" alt="Übersicht mit Wunden- und Bandagentypen" /></a>
		</section>

		<section id="Pneumothorax und Hämothorax">
			<p>Zu einem Pneumothorax (dt. „Luftbrust“) kommt es, wenn Luft durch eine Verletzung aus der Lunge entweicht und in den Zwischenraum von Lunge und Brustkorb gelangt. Diese Luft drückt dann von außen auf den Lungenflügel und hindert ihn daran, sich auszudehnen. Die Atmung ist dann sehr erschwert. Kann diese Luft gar nicht mehr entweichen, kommt es zu einem Spannungspneumothorax. Die Lunge kann sich dann gar nicht mehr ausdehnen und die Atmung versagt.</p>
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

		<section id="Herzinfarkt">
			<p>
				Werkzeuge zur Behandlung eines Herzinfarktes sind die Herz-Lungen-Wiederbelebung, ein Defibrillator, Epinephrin, Amiodaron und Lidocain. Infarkte lassen sich in zwei Kategorien unterteilen: Asystolien, welche nicht mit einem Defibrillator behandelt werden können, und das Kammerflimmern. Letzteres lässt sich möglicherweise mit einem Defibrillator behandeln.
			</p>
			
			<section id="Diagnose">
				<p>
					Nachdem festgestellt wurde, dass kein Puls vorliegt, wird ein Defibrillator (AED oder AED-X) am Torso angelegt. Nach Auswahl von <i>analyze rhythm</i> gibt das Gerät <i>shock advised</i> oder <i>no shock advised</i> zurück. Letzteres bedeutet eine Asystolie, ersteres eine Form von Kammerflimmern.
				</p>
				<p>
					Steht kein Defibrillator zur Verfügung, wird der Herzstillstand wie eine Asystolie behandelt. Amiodaron oder Lidocain dürfen nur angewandt werden, wenn sicher Kammerflimmern vorliegt, bei Asystolie verschlechtern sie den Zustand des Patienten möglicherweise.
				</p>
				<p>
					Bei starkem Blutverlust ist es fast sicher, das der Patient in eine Asystolie fällt. Auch, wenn zwischendurch ein Puls zurückkehren sollte, muss damit gerechnet werden, dass dieser wieder verschwindet, solange der Blutverlust nicht ausgeglichen wurde.
				</p>
			</section>

			<section id="Behandlung vom Kammerflimmern">
				<p>
					Beim Kammerflimmern arbeiten die beiden Herzkammern gewissermaßen gegeneinander, sodass das Herz keine Auswurfleistung hat. Durch einen Schock vom Defibrillator können beide Kammern „wieder synchronisiert“ werden. Bis das gelungen ist, muss allerdings Herz-Lungen-Wiederbelebung durchgeführt werden.
				</p>
				<p>
					Nachdem das Kammerflimmern festgestellt, ein Schock verabreicht wurde und kein Herzschlag zurückgekehrt ist, sollte eine Gabe Epinephrin verabreicht werden und daraufhin 30 bis 60 Sekunden Herz-Lungen-Wiederbelebung durchgeführt werden. Anschließend lässt man den Defibrillator erneut die Arrythmie ananlysieren und wiederholt das Prozedere gegebenenfalls. 
				</p>
				<p>
					Bei der Behandlung vom Kammerflimmern können zusätzlich Amiodaron und Lidocain unterstützend wirken. Amiodaron solle nicht öfter als einmal angewendet werden, genaueres siehe <a href="../medikation#infarkttherapie">Medikationen</a>. Sollte eine Gabe Amiodaron nicht genügen, sollte nach angemessener Zeit Lidocain hinzugezogen werden.
				</p>
			</section>

			<section id="Behandlung einer Asystolie">
				<p>
					Bei der Asystolie liegt im Gegensatz zum Kammerflimmern gar keine Herzmuskelaktivität vor. Sie kann nur durch ständige Herz-Lungen-Wiederbelebung und gelegentliche Gaben von Epinephrin behandelt werden. Amiodaron und Lidocain verringern die Erregbarkeit des Herzmuskels, um Kammerflimmern entgegenzuwirken. Diese Medikamente sind bei der Asystolie also kontraindiziert.
				</p>
				<p>
					Während beständig Herz-Lungen-Wiederbelebung durchgeführt wird sollte ein- bis zweimal pro Minute kontrolliert werden, ob ein Kammerflimmern eingetreten oder der Puls wiedergekehrt ist.
				</p>
			</section>
		
		</section>

		<section id="Transfusionen im Feld">
			<p>
				Standardmäßig führen Sanitäter Blut der Blutgruppe 0- oder Plasma/Kochsalzlösung mit, welche also immer verträglich sind. Genügen diese Reserven nicht, kann im Feld Blut abgenommen werden, wenn ein <a href="../sanitaeter#verbrauchsmaterialien">Feldtransfusionsset</a>
				mitgeführt wird. Dabei ist allerdings die Kompatibilität von Spender- und Empfängerblut dringend zu beachten. Die Blutgruppe eines Kameraden steht auf seiner Marke (Kopf, <i>check dogtag</i>).
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
