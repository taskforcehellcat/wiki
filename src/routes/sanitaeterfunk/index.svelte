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
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
