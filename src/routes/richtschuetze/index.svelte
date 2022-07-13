<script lang="ts">
	import Wiki from '../Wiki.svelte';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="richtschuetze" />
		<h1>Richtschütze (Panzertruppen)</h1>

		<section id="Rollenprofil">
			<p>Der Richtschütze bedient die Waffenanlage seines Fahrzeuges. Er untersteht dem auf seinem Fahrzeug aufgesessenem Kommandanten, der ihm im Verlauf eines Einsatzes eine Vielzahl an Anweisungen erteilen kann. Durch das Abfeuern der Waffensysteme nimmt er unmittelbar Einfluss auf das Gefechtsgeschehen. Aufgrund der Abwesenheit eines Ladeschützen bei der Mehrheit der gepanzerten Fahrzeugen nimmt lediglich der Richtschütze Einfluss auf die Munitionsart der Hauptbewaffnung.</p>
		</section>

		<section id="Aufgaben">
			<p>Das Aufgabenprofil eines Richtschützen kann je nach Fahrzeugklasse und Bewaffnung stark variieren, lässt sich aber in ein paar Punkten zusammenfassen.</p>

			<ol>
				<li>Beobachtung eines zugewiesenen Feuerbereiches/der Hauptschussrichtung</li>
				<li>Meldung feindlicher Kräfte entsprechend der REZ-Regel</li>
				<li>Direkte Bekämpfung des Feindes durch geleitetes Feuern</li>
				<li>Indirekte Bekämpfung des Feindes durch freies Feuern</li>
				<li>Schussbeobachtung, Treffermeldung durchführen</li>
				<li>Meldung über Status feindlicher Ziele</li>
			</ol>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
