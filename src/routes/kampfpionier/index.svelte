<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="kampfpionier" />
		<h1>Kampfpionier</h1>
		<section id="Rollenprofil">
			<p>Die Rolle des Kampfpioniers setzt sich zusammen aus der Rolle des Pioniers und des Schützen. Der Kampfpionier trägt die Verantwortung, den Schutz der eigenen Truppen zu verbessern und dadurch deren Überlebensfähigkeit zu erhöhen, ist anders als der Pionier aber aktiv am Kampfgefecht beteiligt.</p>
		</section>
		<section id="Aufgaben">
			<p>Die Aufgaben eines Kampfpioniers variieren je nach Mission und Situation. Die Hauptaufgaben lassen sich aber in wenigen Punkten grob zusammenfassen.</p>
			<ul>
				<li>die Instandsetzung von Boden- und Luftfahrzeugen</li>
				<li>die Instandsetzung von Infrastruktur, als auch das verstärken und befestigen militärisch genutzter Einrichtungen durch bauliche Maßnahmen</li>
				<li>das Befördern von außerstand-gesetzten Fahrzeugen</li>
				<li>
					das Aufklären und entschärfen von sowohl <span use:tooltip data-tooltip="Anti-personnel (Antipersonen)">AP</span>- & <span use:tooltip data-tooltip="Anti-tank (Panzerabwehr)">AT</span>-Minen
				</li>
				<li>
					das Bedienen von <span use:tooltip data-tooltip="Unmanned ground vehicle (unbemanntes Bodenfahrzeug)">UGV</span>
					und
					<span use:tooltip data-tooltip="Unmanned aerial vehicle (unbemanntes Fluggerät)">UAV</span> Dronen
				</li>
			</ul>
		</section>
		<section id="Ausrüstung">
			<p>In Ergänzung zu der Grundausrüstung des Schützen zählen folgende Gegenstände zur Ausrüstung des Kampfpioniers:</p>
			<ul>
				<li><span use:tooltip data-tooltip="Minensuchgerät">Mine Detector</span></li>
				<li><span use:tooltip data-tooltip="Werkzeugkasten">Toolkit</span></li>
				<li>
					<span use:tooltip data-tooltip="Terminal zum Steuern von oben erläuterten UAVs & UGVs">UAV-Terminal</span>
				</li>
				<li>
					<span use:tooltip data-tooltip="Klappspaten, zum aufschaufeln von Deckung im Feld">Entrenching-Tool</span>
				</li>
				<li>je nach Situation ein Minenräumungsfahrzeug, oder diverse Dronen</li>
			</ul>
		</section>
		<section id="Fertigkeiten">
			<ul>
				<li>erweiterte Kenntnisse über eigene Fahrzeuge</li>
				<li>Verwendung der oben genannten Ausrüstung</li>
			</ul>
		</section>
		<section id="Weiteres">
			<p>Kampfpionier immer halal</p>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">23.09.2022</svelte:fragment>
</Wiki>
