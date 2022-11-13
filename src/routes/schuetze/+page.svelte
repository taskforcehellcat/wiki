<script lang="ts">
	import Wiki from '../wiki/+page.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<h1>Schütze</h1>

		<section id="Rollenprofil">
			<p>
				Der Schütze ist die grundlegendste Rolle der Task Force Hellcat. Mit der Grundausbildung erhält jedes neue Mitglied den Zugang zur Rolle des Schützen. Die Kenntnisse und Fähigkeiten eines Schützen stellen die Grundlagen des Mitspielens dar, auf die alle anderen Rollen aufbauen.
			</p>
		</section>
		<section id="Aufgaben">
			<p>Schützen nehmen unmittelbaren Einfluss auf die Gefechtseffektivität ihres Trupps beziehungsweise ihrer Gruppe. Das Aufgabenprofil der Schützen gestaltet sich dabei vielfältig. Zu den Hauptaufgaben eines Schützen zählen die folgenden Punkte.</p>

			<ul>
				<li>Ausführen der Befehle des Trupp- oder Gruppenführers</li>
				<li>Führen des Feuergefechts mit direktem oder indirektem Feuer mit Handfeuerwaffen</li>
				<li>Leisten Erster Hilfe an Kameraden und sich selbst</li>
				<li>fachgerechter Informationsaustausch über das Funkgerät auf Trupp- oder Gruppenebene</li>
				<li>Verwendung von Orientierungsmitteln wie Karte und Kompass</li>
				<li>Fahren von Fahrzeugen und Bedienung derer Waffenanlagen</li>
				<li>Bewegen in taktischen Formationen im Feld</li>
			</ul>
		</section>
		<section id="Ausrüstung">
			<p>Die Ausrüstung des Schützen stellt die Grundausrüstung vieler anderer Rollen dar. Zusätzlich kann der Schütze besondere Ausrüstungsgegenstände anderer Rollen tragen, wie zum Beispiel Ersatzläufe eines MG-Schützen, zusätzliche Munition oder Infusionen. Zur Ausrüstung eines jeden Schützen zählen folgende Gegenstände:</p>

			<ul>
				<li>eine Primärwaffe für das Gefecht auf mittlere Distanz</li>
				<li>eine Sekundärwaffe für das Gefecht auf kurze Distanz</li>
				<li>ein Funkgerät für den Informationsaustausch auf Trupp- oder Gruppenebene</li>
				<li>ein Spaten für das Errichten von Schützengräben im Feld</li>
				<li>eine Karte und einen Kompass zur Orientierung im Feld</li>
				<li>ein Fernglas zur Feldaufklärung</li>
			</ul>
		</section>
		<section id="Fertigkeiten">
			<p>Schützen müssen die grundlegendsten und damit wichtigsten Fertigkeiten beherrschen, auf die viele andere Rollen aufbauen. Dazu zählen folgende Punkte:</p>

			<ul>
				<li>Kenntnisse über Formationen und Bewegung im Feld</li>
				<li>Beherrschung der <a href="../erstehilfe">Ersten Hilfe</a> zur Selbst- und Fremdversorgung</li>
				<li>Beherrschung der <a href="../funketikette">Funketikette</a></li>
				<li>Kenntnisse zur <a href="../steuerung">Bedienung von Handfeuerwaffen</a></li>
			</ul>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
