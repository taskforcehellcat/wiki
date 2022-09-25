<script lang="ts">
	import CloseMenu from '$lib/burgermenu/closeMenu.svelte';
	import Wiki from '../wiki.svelte';

	/* Images */
	import guide from '$lib/images/fahrzeuge/guide.png';

</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="fahrzeugidentifikation" />
		<h1>Fahrzeugidentifikation</h1>

		<section id="Grundlagen">
			<img src={guide} alt="Fahrzeugguide">
			
		</section>

		<section id="Kampfpanzer">
			<p>Kurz: KPz oder MBT (<i>main battle tank</i>). Kampfpanzer haben im Gegensatz zum Schützenpanzer ein 120mm Hauptgeschütz. Vom Artilleriepanzer unterscheidet sich der Kampfpanzer durch starke Panzerung und einen mittig platzierten Turm. Zumeist bewegen sie sich auf Ketten, es gibt aber auch Radkampfpanzer.</p>
		</section>

		<section id="Schützenpanzer">
			<p>Kurz: SPz oder IFV (<i>infantry fighting vehicle</i>). Sie besitzen einen Turm, dabei allerdings ein im Vergleich zum KPz deutlich kleineres 20mm bis 30mm Hauptgeschütz. Zumeist bewegen sie sich auf Ketten, es gibt aber auch Radschützenpanzer.</p>
		</section>

		<section id="Artilleriepanzer">
			<p>Ähnlich wie der Kampfpanzer besitzt ein Artilleriepanzer Ketten und einen Turm, ist allerdings weniger stark gepanzert. Sein Turm ist meist weiter am Heck und nicht mittig auf der Wanne platziert und führt ein größeres 160mm Geschütz.</p>
		</section>

		<section id="Mannschaftstransporter">
			<p>Auch: APC (<i>armored personnel carrier</i>). Meist nur leicht bewaffnet, etwa mit einem Maschinengewehr.</p>
		</section>

		<section id="Selbstfahrlafette">
			
		</section>

		<section id="Sonstiges">
			
		</section>
		
	</svelte:fragment>
	<svelte:fragment slot="editdate">00.00.0000</svelte:fragment>
</Wiki>
