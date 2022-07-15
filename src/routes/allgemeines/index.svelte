<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="allgemeines" />
		<h1>Allgemeines</h1>

		<section id="Über uns">
			<section id="Beschreibung">
				<p>
					Die Task Force Hellcat ist eine 2021 gegründete Community, die Milsim in der von Bohemia Interactive entwickelten Militärsimulation <a href="https://de.wikipedia.org/wiki/Arma_3" target="_blank">ArmA 3</a> spielt. Dabei wird ein besonderer Wert auf Strategie, Teamplay, Realismus und Immersion gesetzt. Fast jedes Wochenende findet entweder ein Event oder eine Übung statt. Gespielt wird in Kampagnen, die in aufeinanderfolgenden Events absolviert werden. Die Karte und die Nation werden vor Beginn einer Kampagne gewählt, wodurch sich die Spieler aktiv bei der Planung beteiligen können, um für Abwechslung und Vielfältigkeit der Kampagnen zu sorgen.
				</p>
			</section>

			<section id="Organisation">
				<p>
					Die Organisation unserer Einheit findet ausschließlich auf unserem <a href="https://discord.gg/Ap3bEmBgXw" target="_blank">Discord</a> statt. Nachdem unser Regelwerk gelesen und akzeptiert wurde, freuen wir uns über einen Beitritt zu unserem Discord Server. Dort erfolgen Eventankündigungen, Wahlen, Verabredungen zu Ausbildungen, Updates zum Modpack und vieles mehr. Auch Fragen bezüglich unserer Community, des Spiels oder Ähnlichem können dort gestellt werden.
				</p>
			</section>
		</section>

		<section id="Mitmachen">
			<section id="Voraussetzungen">
				<ul>
					<li>ein Mindestalter von 16 Jahren</li>
					<li>
						ein <span use:tooltip data-tooltip="für Ratschläge gerne Serverleitung fragen :)">geeigneter Computer</span>
						mit
						<span use:tooltip data-tooltip="Basegame mit DLC ~45 GB + unser Modpack ~50 GB">genügend Festplattenspeicher</span>
					</li>
					<li>
						das Spiel <a href="https://store.steampowered.com/app/107410/Arma_3/" target="_blank">ArmA 3</a>
					</li>
					<li>ein Discord-Account mit verifizierter E-Mail</li>
					<li>
						<a href="https://www.teamspeak.com/en/" target="_blank">TeamSpeak 3</a> und mindestens ein Headset, vorzugsweise ein
						<span use:tooltip data-tooltip="für Ratschläge gerne Serverleitung fragen :)">vernünftiges Mikrofon</span>
					</li>
				</ul>
				<p>
					Zusätzlich werden zu ArmA 3 das <a href="https://store.steampowered.com/app/395180/Arma_3_Apex/" target="_blank">Apex DLC</a>
					und das
					<a href="https://store.steampowered.com/app/1042220/Arma_3_Creator_DLC_Global_Mobilization__Cold_War_Germany/" target="_blank">Global Mobilization DLC</a> empfohlen, allerdings nicht zwangsweise benötigt.
				</p>
			</section>

			<section id="Beitritt">
				<p>Vor dem Beitritt in unsere Community durchläuft der Bewerber ein persönliches Gespräch mit unserem Personal. In diesem Gespräch möchten wir die Vorlieben des Bewerbers erfahren und erklären unsererseits, wie wir uns das gemeinsame Spielen vorstellen.</p>
				<p>Wenn wir im Laufe des Gesprächs feststellen, dass wir zueinander passen, freuen wir uns, ein neues Mitglied in unsere Einheit aufzunehmen.</p>
			</section>

			<section id="Aufstieg">
				<p>
					Jeder Bewerber beginnt als Rekrut. Diese Rolle gibt ihm die Möglichkeit unsere Community kennenzulernen und festzustellen, ob wir die richtige Community für ihn sind. Der Rekrut kann zum Kadett aufsteigen, indem er die Grundausbildung durchläuft, die ihm die Teilnahme an Kampagnen und Übungen sowie die Fortbildung zu <span use:tooltip data-tooltip="Grenadier, AT-Schütze, MG-Schütze, Präzisionsschütze, Funker">grundlegenden Rollen der Infanterie</span>
					ermöglicht. Ein Kadett kann zum Mitglied werden, indem er gutes Verhalten und Erfahrenheit aufweist. Mitglieder haben die Möglichkeit
					<span use:tooltip data-tooltip="Sanitäter, Scharfschütze, Helikopterpilot, JTAC, Richtschütze, usw.">fortgeschrittene Aus- und Fortbildungen</span> aller Abteilungen zu durchlaufen.
				</p>
			</section>
		</section>

		<section id="Struktur">
			<p>
				Die Task Force Hellcat ist in drei Abteilungen untergliedert, die verschiedene Truppengattungen umfassen. Jede Abteilung wird von einem eigenen Abteilungsleiter verwaltet und organisiert. Weitere Informationen und Erklärungen zu den Truppengattungen können
				<a href="../abteilungen">hier</a> eingesehen werden.
			</p>

			<img alt="Task Force Hellcat Struktur" src="./images/tfhc_struktur.svg" class="noselect" />
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.06.2022</svelte:fragment>
</Wiki>
