<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="schuetze" />
		<h1>Schütze</h1>

		<section id="Rollenprofil">
			<p>
				Der Schütze ist die grundlegendste Rolle der Task Force Hellcat. Jedes neue Mitglied beginnt gleich nach der Grundausbildung mit der Rolle des Schützen, da ihre Hauptaufgabe die fachgerechte Anwendung der Grundkenntnisse ist. Als Rekrut kann man zusätzlich zur Rolle des Schützen eine Ausbildung auf eine Spezialisierung wie beispielsweise <span use:tooltip data-tooltip="AT = Anti Tank (Panzerabwehr)">AT</span>-Schütze oder Präzisionsschütze absolvieren.
			</p>
		</section>
		<section id="Aufgaben">
			<p>Die Rolle des Schützen ist das bekämpfen und niederhalten von feindlichen Kräften</p>
		</section>
		<section id="Ausrüstung">
			<p />
		</section>
		<section id="Fertigkeiten">
			<p />
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.06.2022</svelte:fragment>
</Wiki>
