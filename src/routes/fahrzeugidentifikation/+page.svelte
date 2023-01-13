<script lang="ts">
	import CloseMenu from '$lib/burgermenu/closeMenu.svelte';
	import Wiki from '../wiki/+page.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';

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
			<p>Ein <span use:tooltip data-tooltip="kurz: KPz">Kampfpanzer</span> (engl. <span use:tooltip data-tooltip="kurz: MBT">Main Battle Tank</span>) ist ein schwer gepanzertes Kettenfahrzeug.</p>

			<p>Ein moderner Kampfpanzer besteht grob zusammengefasst aus drei Komponenten: Einer schwer gepanzerten Wanne, einen (rundum drehbaren und meist mittig auf der Wanne platzierten) Turm und einer im Turm verbauten <span use:tooltip data-tooltip="meist mit einem Durchmesser von 120mm">Hauptkanone</span>. Kampfpanzer agieren in Panzerverbänden und niemals alleine, dabei werden sie oftmals von der Infanterie in Schützenpanzern begleitet. Kampfpanzer sind nicht darauf ausgelegt Infanteristen zu transportieren. Die Aufgabe von Kampfpanzern ist die Bekämpfung gegnerischer Panzerverbände und befestigter Stellungen.</p>
		</section>

		<section id="Schützenpanzer">
			<p>Ein <span use:tooltip data-tooltip="kurz: SPz">Schützenpanzer</span> (engl. <span use:tooltip data-tooltip="kurz: IFV">Infantry Fighting Vehicle</span>) ist ein Panzerfahrzeug, das sowohl auf Ketten als auch auf Rädern vorkommen kann.</p>

			<p>Ein moderner Schützenpanzer agiert gemeinsam mit auf- und abgesessenen <span use:tooltip data-tooltip="Infanterie">Panzergrenadieren</span>. Grundsätzlich setzen sich Schützenpanzer aus einer gepanzerten Wanne, einem Geschützturm mit einer <span use:tooltip data-tooltip="meist mit einem Durchmesser von 20-30mm">automatischen Kanone</span> und einem Transportraum für die Panzergrenadiere zusammen. Oftmals werden sie gemeinsam mit Kampfpanzern in Panzerverbänden eingesetzt.</p>
		</section>

		<section id="Transportpanzer">
			<p>Ein <span use:tooltip data-tooltip="kurz: TPz">Transportpanzer</span> (engl. <span use:tooltip data-tooltip="kurz: APC">Armored Personnel Carrier</span>) ist ein gepanzertes Fahrzeug, das zum Transport von Infanteristen eingesetzt wird.</p>

			<p>Moderne Transportpanzer können in vielen Formen auftreten, unter anderem ähnlich wie Schützenpanzer mit Ketten oder Rädern. Hauptmerkmale sind ein großer Transportraum für Infanteristen und eine leichte Bordbewaffnung. Grundsätzlich sind Transportpanzer leichter gepanzert und leichter bewaffnet als Schützenpanzer. Dementsprechend werden sie auch nicht für den direkten Feuerkampf eingesetzt. Meist verfügen Transportpanzer über Maschinengewehre oder Granatwerfer, um einen sicheren Transport der Infanterie zu gewährleisten.</p>
		</section>

		<section id="Artilleriepanzer">
			<p>Der Artilleriepanzer (engl. <span use:tooltip data-tooltip="kurz: SPG">Self-Propelled Gun</span>) ist ein mobiles Artilleriegeschütz. Hauptmerkmale sind eine große, leichtgepanzerte Wanne und ein großer (meist hinten an der Wanne platzierter) Turm mit großer <span use:tooltip data-tooltip="meist mit einem Durchmesser von 155mm">Kanone</span>. Artilleriepanzer haben einen großen positiven Richtwinkel der Kanone, um auf große Entfernungen wirken zu können. Ihre Aufgabe ist die Feuerunterstützung von verbündeten Kräften an der Front durch Steilfeuer, dabei oftmals ohne direkte Sicht auf das Ziel.</p>
		</section>

		<section id="Flugabwehr">
			<p>Der Sammelbegriff Flugabwehr umfasst viele verschiedene Fahrzeuge und Fahrzeugtypen. Wir konzentrieren uns vorrangig auf <span use:tooltip data-tooltip="kurz: FlakPz">Flakpanzer</span>. Diese Fahrzeuge werden zur Sicherung des Luftraumes auf kurze und mittlere Distanz verwendet, unter anderem oft mit mehreren <span use:tooltip data-tooltip="meist mit einem Durchmesser von 20 bis 35mm">Flugabwehrkanonen</span> und/oder Boden-zu-Luft-Raketen. Grob zusammengefasst verfügen die meisten Flakpanzer über eine leichtgepanzerte Wanne und einen Turm, an dem die Flugabwehrkanonen und/oder Raketen angebracht sind. Ein am Turm befestigtes <span use:tooltip data-tooltip="muss nicht immer vorhanden sein">Radar</span> sowie die Bewaffnung eines Flakpanzers sind wohl seine markantesten Merkmale.</p>
		</section>

		
	</svelte:fragment>
	<svelte:fragment slot="editdate">13.01.2023</svelte:fragment>
</Wiki>
