<script lang="ts">
	import Wiki from '../wiki.svelte';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<h1>Fahrer (Panzertruppen)</h1>

		<section id="Rollenprofil">
			<p>Der Kraftfahrer nimmt unmittelbar Einfluss auf die Bewegung des Fahrzeuges entsprechend der Anweisungen des Kommandanten. Die eigenständige Manövrierung seines Fahrzeuges entlang Straßen oder durch das Gelände bei oft schlechten Sichtmöglichkeiten stellt seine größte Hürde dar.</p>
		</section>

		<section id="Aufgaben">
			<p>Die Kraftfahrer der Panzertruppen unterstehen der kontinuierlichen Aufgabe die Befehle ihrer Kommandanten möglichst schnell in die Tat umzusetzen, um die Sicherheit ihres Fahrzeuges samt Besatzung zu gewährleisten. Das Aufgabenprofil der Kraftfahrer ist für alle Fahrzeugklassen der Panzertruppen gleich.</p>

			<ol>
				<li>Herstellung der Gefechtsbereitschaft</li>
				<li>Einlegen eines Schießhaltes (rascher Halt des Panzers, ausgerichtet in Feindrichtung)</li>
				<li>Anfahren einer vom Kommandanten bestimmten Stellung</li>
				<li>Wenn möglich Schussbeobachtung und Treffermeldung durchführen</li>
				<li>Gefechtsfeldbeobachtung durchführen und Feindkontakte melden</li>
				<li>Erkundigt sich nach dem Fortschritt des Einsatzes</li>
			</ol>
		</section>

		<section id="Weiteres">
			<p>Eine Konvention für Kraftfahrer der Panzertruppen ist die Wiederholung von Fahrbefehlen des Kommandanten, um ein gewisses Feedback zurückzugeben, dass der Befehl korrekt aufgenommen werden konnte. Im Gefecht kann darauf gegebenenfalls verzichtet werden.</p>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
