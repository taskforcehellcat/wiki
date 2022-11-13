<script lang="ts">
	import Wiki from '../wiki/+page.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<h1>Truppenteile</h1>

		<section id="Einleitung">
			<p>
				Innerhalb unserer Einheit gibt es klare Festlegungen von <span use:tooltip data-tooltip="die Anzahl von Soldaten">Truppenteilen</span>. Diese sind hilfreich, um zum Beispiel schnell und effizient über eigene oder feindliche Kräfte zu informieren. Sie werden auf dieser Seite näher erläutert.
			</p>
		</section>

		<section id="Buddyteam">
			<p>
				Das Buddyteam ist die kleinste taktische Einheit. Es setzt sich aus <b>zwei Soldaten</b>
				zusammen, die sich gegenseitig unterstützen und Aufträge erfüllen. Soldaten im Feld werden immer <i>mindestens</i> in der Form des Buddyteams agieren. Das bringt mehrere Vorteile mit sich: Falls einer der beiden Soldaten ausfällt, kann der andere den Ausfall melden und mit der Erstversorgung beginnen. Zusätzlich können sich die beiden Soldaten abwechselnd im Feld decken, falls Freiflächen überquert werden müssen.
			</p>
		</section>

		<section id="Trupp">
			<p>
				Der Trupp ist eine taktische Einheit, die sich aus <b>drei bis sieben Soldaten</b>
				zusammensetzt. Grundsätzlich enthält er einen Truppführer und ihm unterstellte Soldaten.
				<br />
				<br />
				Eine besondere Form des Trupps ist der Panzergrenadiertrupp, der gemeinsam mit einem Schützenpanzer agiert.
			</p>
		</section>

		<section id="Gruppe">
			<p>
				Die Gruppe ist eine taktische Einheit, die sich aus <b>acht bis zwölf Soldaten</b>
				zusammensetzt. Grundsätzlich besteht eine Gruppe aus einem Gruppenführer, einem stellvertretenden Gruppenführer und weiteren Soldaten. Oft teilen sich Gruppen in zwei
				<span use:tooltip data-tooltip="Angriffs- und Deckungstrupp">Halbgruppen</span>, um die Bewegung im Feld besser zu koordinieren und sich gegenseitig zu decken. Die beiden Halbgruppen werden vom Gruppenführer und dem stellvertretenden Gruppenführer geführt.
			</p>
		</section>

		<section id="Zug">
			<p>
				Der Zug ist eine taktische Einheit, die sich aus <span use:tooltip data-tooltip="circa vierzig Soldaten"><b>drei Gruppen und einem Zugtrupp</b></span>
				zusammensetzt. Der Zugtrupp wird vom Zugführer geführt, der gleichzeitig die restlichen Gruppen des Zuges befehligt. Die drei Gruppen des Zuges werden jeweils von einem Gruppenführer geführt, die dem Zugführer unterstellt sind.
				<br />
				<br />
				Bei den Panzertruppen wird unter einem Zug eine Zusammensetzung aus vier gepanzerten Fahrzeugen verstanden, zum Beispiel vier Kampfpanzer oder vier Schützenpanzer. Der Zugführer befindet sich dabei selbst aufgesessen auf einem der vier Fahrzeuge.
			</p>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">03.07.2022</svelte:fragment>
</Wiki>
