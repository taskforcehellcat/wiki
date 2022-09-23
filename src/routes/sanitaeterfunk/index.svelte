<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="sanitaeterfunk" />
		<h1>Sanitäterfunk</h1>

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

		<section id="Medevac-Funk">
			<p>Um einen Medevac anzufordern, verwenden wir das folgende, vom NATO-Neunzeiler abgeleitete Schema:</p>
			<ul>
				<li>Zeile 1: Landezone (Koordinaten oder markante Beschreibung)</li>
				<li>Zeile 2: Rufzeichen und Funkfrequenz</li>
				<li>
					Zeile 3: Zahl der Patienten nach obigen Meldesystem
					<ul>
						<li>Kat. Rot: kritisch</li>
						<li>Kat. Gelb: Priorität</li>
						<li>Kat. Grün: Routine</li>
					</ul>
				</li>
				<li>An dieser Stelle wird unterbrochen und die bisherigen Informationen bestätigt.</li>
				<li>
					Zeile 4: Sicherheit der Landezone
					<ul>
						<li>N <i>(no presence)</i>: keine feindlichen Teile in der Umgebung</li>
						<li>P <i>(possible presence)</i>: möglicherweise feindliche Teile in der Umgebung, Vorsicht beim Annähern</li>
						<li>E <i>(enemy presence)</i>: feindliche Teile in der Umgebung, Vorsicht beim Annähern</li>
						<li>X: feinliche Präsenz in der Umgebung, bewaffnete Eskortierung vonnöten</li>
					</ul>
				</li>
				<li>
					Zeile 5: Markierung der Landezone
					<ul>
						<li>A: pyrotechnisches Signal</li>
						<li>B: Rauchsignal (Farbe benennen)</li>
						<li>C: keine</li>
						<li>D: andere (benennen)</li>
					</ul>
				</li>
				<li>
					Zeile 6: Zugehörigkeit der Patienten
					<ul>
						<li>A: eigene Teile</li>
						<li>B: Zivilisten</li>
						<li>C: feindliche Teile</li>
					</ul>
				</li>
			</ul>

			<div use:exampleBox>
				<p>„Alpha-Lead, hier Alpha-2, Anfrage: MEDEVAC sechszeilig.“</p>
				<p>„Alpha-2, hier Alpha-Lead, bereit für Sechszeiler, kommen.“</p>
				<p>„Zeile eins: Koordinaten sechsstellig: eins zwo vier Trennung zwo fünnüf acht, markant Stadtzentrum zentraler Platz.</p>
				<p>Zeile zwo: Abholung für Alpha-3, Verständigung mit SEM fünnüf zwo SL, vier sieben Megahertz.</p>
				<p>Zeile drei: zwo Kat. rot, drei Kat. gelb und Kat. grün; Kat. Schwarz vorhanden. So mit?“</p>
				<p>„Bestätige: Medevac bei eins zwo vier Trennung zwo fünnüf acht, Stadtmitte, für Alpha-3 mit zwo Kat. rot, drei Kat. gelb und Kat. grün. Verständigung mit SEM, vier sieben Megahertz.“</p>
				<p>„Zeile vier: X-Ray, PzA erkannt.</p>
				<p>Zeile fünnüf: Bravo, türkis.</p>
				<p>Zeile sechs: fünnüf Alpha, zwo Bravo, ein Charlie. So mit?“</p>
				<p>„Bestätige: Landezone heiß, mindestens PzA, markiert mit Rauch türkis, bereit für fünnüf eigene, zwo zivil, ein POW. Kommen.“</p>
				<p>„So korrekt. Kommen.“</p>
				<p>„ETA sechs Mike dreißig, Alpha-Lead Ende.“</p>
			</div>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
