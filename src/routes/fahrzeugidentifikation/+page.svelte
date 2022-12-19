<script lang="ts">
	import CloseMenu from '$lib/burgermenu/closeMenu.svelte';
	import Wiki from '../wiki/+page.svelte';

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

		<section id="Übersicht">
			<img src={guide} alt="Fahrzeugguide" />
		</section>

		<section id="Kampfpanzer">
			<p>Ein MBT (<b>M</b>ain <b>B</b>attle <b>T</b>ank, Kampfpanzer) ist ein schwer gepanzertes Kettenfahrzeug.</p>
			<p>Er besteht grob zusammengefasst aus zwei Komponenten: eine Wanne und ein Turm. Das wohl auffälligste Erkennungsmerkmal ist der Turm mit der Hauptbewaffnung. Der Turm ist ungefähr in der Mitte der länglichen Wanne aufgebracht und kann diesen um 360° drehen. An diesem Turm ist ein langes Kanonenrohr angebracht was einen Durchmesser von über 100-mm hat. Der Turm selber ist hierbei meist relativ flach gehalten und nicht zu verwechseln mit den sehr großen Türmen einer Panzerhaubitze, die dazu auch ein größeres Kanonenrohr mit einem hohen positiven Richtwinkel besitzen.</p>
		</section>

		<section id="Flugabwehr">
			<p>AA steht für „<b>A</b>nti <b>A</b>ir“ (Flugabwehr, umgangssprachlich auch <i>Flak</i>). Es ist ein System, dessen ursprünglicher Zweck die Zerstörung von feindlichen Lufteinheiten ist. Es gibt sie stationär und als Flugabwehrkanonenpanzer. Letztere sind, wie der Name schon sagt, auf Ketten unterwegs. Sie basieren meist auf der Wanne eines Kampfpanzers, haben aber einen deutlich anderen Turm. Auch dieser Turm ist speziell durch seine Bewaffnung gekennzeichnet. Es befinden sich meist mehrere großkalibrige Maschinenkanonen am Turm, welche einen positiven Richtwinkel von bis zu 90° haben können. Auch ihr Turm ist um 360° drehbar und hat meist auch das Radar aufsitzen. Das Radar ist, neben der Bewaffnung, wohl das markanteste Merkmal.</p>
		</section>

		<section id="Artilleriepanzer">
			<p>Der Artilleriepanzer (<b>S</b>elf <b>P</b>ropelled <b>G</b>un, SPG) ist ein mobiles Artilleriegeschütz. Es besitzt ebenfalls eine Wanne und einen Turm. Beides ist meist größer als bei einem MBT. Auffällig ist das besonders große Geschütz mit einem Kaliber von 155-mm bis teilweise 203-mm. Sie haben einen hohen positiven Richtwinkel um auf große Entfernung wirken zu können. Einige Exemplare sind außerdem in der Lage ihren Turm samt Geschütz zu drehen.</p>
		</section>

		<section id="Mannschaftstransporter">
			<p>Der Schützenpanzer (<b>I</b>nfantry <b>F</b>ighting <b>V</b>ehicle, IFV) und der Mannschaftstransportwagen (<b>A</b>rmored <b>P</b>ersonnel <b>C</b>arrier, APC) sind äußerlich nicht allzu leicht zu unterscheiden. Sie sind beide ein fester Bestandteil ihres Trupps. Allerdings ist der APC oft auf Rädern unterwegs und sind gar nicht bis leicht, meist 7.62-mm, 50 cal, 14.5-mm oder 30/40-mm Granatwerfer, bewaffnet welche gegebenenfalls auch auf einen kleinen Turm montiert sein können.</p>
			<p>Das IFV hingegen ist auf Ketten unterwegs und hat einen kleinen Turm welcher mit einem 20-mm-Geschütz oder noch größerem Kaliber sowie Panzerabwehrraketen bewaffnet ist.</p>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">13.10.2022</svelte:fragment>
</Wiki>
