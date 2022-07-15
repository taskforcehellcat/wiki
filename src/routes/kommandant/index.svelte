<script lang="ts">
	import Wiki from '../wiki.svelte';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="kommandant" />
		<h1>Kommandant (Panzertruppen)</h1>

		<section id="Rollenprofil">
			<p>Der Kommandant hat die Befehlsgewalt und trägt die Verantwortung für sein Fahrzeug und die dazugehörige Besatzung. Seine Priorität ist der Erhalt der Gefechtsbereitschaft seines Fahrzeuges durch adäquate Führung seiner Besatzung. In der Befehlskette untersteht er dem Zugführer, der Anweisungen an einzelne Kommandanten oder den ganzen Zug erteilen kann.</p>
		</section>

		<section id="Aufgaben">
			<p>Der Kommandant nimmt unmittelbar Einfluss auf das Verhalten seines Fahrzeuges und seiner Besatzung. Das Aufgabenprofil des Kommandanten kann zwischen Fahrzeugtypen variieren, lässt sich aber in wenigen Punkten grob zusammenfassen.</p>

			<ol>
				<li>Herstellung der Gefechtsbereitschaft des Fahrzeuges samt Besatzung</li>
				<li>Anweisungen zur Bewegung des Fahrzeuges an den Fahrer</li>
				<li>Anweisungen zur Bedienung der Waffensysteme an den Richtschützen</li>
				<li>Führen des Funkverkehrs mit dem Zugführer</li>
				<li>Umsetzung von Befehlen des Zugführers</li>
				<li>Aktives Aufklären und Wahrung von Situationsbewusstsein</li>
				<li>Bestimmen der Munitionsart der Hauptkanone</li>
				<li>Einsatzvermittlung an seine Besatzung</li>
			</ol>
		</section>

		<section id="Fertigkeiten">
			<p>Die Kommandanten der Panzertruppen müssen eine handvoll Fertigkeiten beherrschen, um ihr Fahrzeug möglichst sicher und effizient ins Gefecht zu führen. Diese Fertigkeiten tragen dazu bei die Übersicht zu behalten und Gefahrensituation einschätzen zu können, wodurch ein reibungsloser Einsatz gewährleistet werden kann.</p>

			<ol>
				<li>Die Beherrschung und Einhaltung der Funketikette</li>
				<li>Erweiterte Kenntnisse über eigene und feindliche Fahrzeuge</li>
				<li>Die Beherrschung des NATO-Alphabets</li>
				<li>Eine gute Orientierungsfähigkeit</li>
			</ol>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
