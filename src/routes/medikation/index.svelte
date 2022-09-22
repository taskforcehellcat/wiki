<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';


	/* images */
	//import sixteen_g from '$lib/images/sanitaeter/16g.png'
	//import twenty_g from '$lib/images/sanitaeter/20g.png'
	//import accuvac from '$lib/images/sanitaeter/accuvac.png'
	import adenosine from '$lib/images/sanitaeter/adenosine.png'
	//import aed_x from '$lib/images/sanitaeter/aed_x.png'
	import amiodarone from '$lib/images/sanitaeter/amiodarone.png'
	import atropine from '$lib/images/sanitaeter/atropine.png'
	//import bandagen from '$lib/images/sanitaeter/bandagen.png'
	//import blood_iv from '$lib/images/sanitaeter/blood_iv.png'
	//import blutgruppen from '$lib/images/sanitaeter/blutgruppen.png'
	//import bodybag from '$lib/images/sanitaeter/bodybag.png'
	import carbonate from '$lib/images/sanitaeter/carbonate.png'
	//import chest_seal from '$lib/images/sanitaeter/chest_seal.png'
	//import defib from '$lib/images/sanitaeter/defib.png'
	//import elastic_bandage from '$lib/images/sanitaeter/elastic_bandage.png'
	import epinephrine from '$lib/images/sanitaeter/epinephrine.png'
	//import fast_io from '$lib/images/sanitaeter/fast_io.png'
	//import field_dressing from '$lib/images/sanitaeter/field_dressing.png'
	//import guedel from '$lib/images/sanitaeter/guedel.png'
	//import infarkt from '$lib/images/sanitaeter/infarkt.png'
	//import larynx_normal from '$lib/images/sanitaeter/larynx_normal.png'
	import lidocaine from '$lib/images/sanitaeter/lidocaine.png'
	import morphine from '$lib/images/sanitaeter/morphine.png'
	import naloxone from '$lib/images/sanitaeter/naloxone.png'
	import nitro from '$lib/images/sanitaeter/nitro.png'
	import norep from '$lib/images/sanitaeter/norep.png'
	import ondansetron from '$lib/images/sanitaeter/ondansetron.png'
	//import packing_bandage from '$lib/images/sanitaeter/packing_bandage.png'
	//import personal_aid_kit from '$lib/images/sanitaeter/personal_aid_kit.png'
	import phenylephrin from '$lib/images/sanitaeter/phenylephrin.png'
	//import plasma_iv from '$lib/images/sanitaeter/plasma_iv.png'
	//import pulseoximeter from '$lib/images/sanitaeter/pulseoximeter.png'
	//import quickclot from '$lib/images/sanitaeter/quickclot.png'
	//import saline_iv from '$lib/images/sanitaeter/saline_iv.png'
	//import splint from '$lib/images/sanitaeter/splint.png'
	//import stabilisierung from '$lib/images/sanitaeter/stabilisierung.png'
	//import stethoscope from '$lib/images/sanitaeter/stethoscope.png'
	//import surgical_airway_kit from '$lib/images/sanitaeter/surgical_airway_kit.png'
	//import surgical_kit from '$lib/images/sanitaeter/surgical_kit.png'
	//import tourniquet from '$lib/images/sanitaeter/tourniquet.png'
	import txa from '$lib/images/sanitaeter/txa.png'
	//import wolf from '$lib/images/sanitaeter/wolf.png'
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="sanitaeter" />
		<h1>Medikationen</h1>

		<section>
			<p>Diese Seite enthält Medikamente, ihre Wirkung und Hinweise zu Dosierung und Wechselwirkungen. Wann und wie genau sie zur Anwendung kommen, erklärt die Seite <a href="">Behandlungen (dead link)</a>.</p>
		</section>

		<section id="Basismedikamente">
			<p>Medikamente, die als Autoinjektoren mitgeführt werden, bedürfen keines Zuganges für die Verabreichung und können daher auch von Nichtsanitätern angewandt werden.</p>
			<section>
				<h4>
					<span use:tooltip data-tooltip-img="{morphine}">Morphin-Autoinjektor</span>
				</h4>
				<p>unterdrückt Schmerz. Wirkt Blutverdünnend, senkt Herzrate. Stark, leicht überzudosieren (Überdosis-Therapie mit Naloxon). Nicht mehr als eine Gabe pro 10 Minuten.</p>
				<h4><span use:tooltip data-tooltip-img="">Painkillers</span> (dt. Schmerztabletten)</h4>
				<p>
					lindern Schmerzen. Heben den Blutdruck leicht (unbedeutend, solange keine große Menge verwendet wurde). Sollten zur Behandlung leichter Schmerzen Morphin vorgezogen werden. Können auch von Soldaten eigenständig ohne größeres Risiko eingenommen werden. Kann bei versehentlicher Bluttransfusion mit falscher Blutgruppe lebensrettend wirken (siehe <a href="">Transfusion von Blut (dead link)</a>). Werden im Arsenal bei den Magazinen geführt.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{epinephrine}">Epinephrin-Autoinjektor</span> (Adrenalin)
				</h4>
				<p>hebt die Herzrate, kann auch Behandlung von Morphin-Überdosen unterstützen.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{adenosine}">Adenosin-Autoinjektor</span>
				</h4>
				<p>senkt die Herzrate, kann zur Behandlung von Epinephrin-Überdosen verwendet werden.</p>
			</section>
		</section>

		<section id="Infarkttherapie">
			<p>Medikamente zur Behandlung von Herzstillständen, siehe auch <a href="">(dead link)</a>.</p>
			<section>
				<h4>
					<span use:tooltip data-tooltip-img="{amiodarone}">Amiodaron</span>
				</h4>
				<p>
					<span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>, bis zu 2,5 Mal so wirksam wie Lidocain. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Verursacht in einem von drei Fällen eine
					<span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardie</span>. Empfohlen ist eine Gabe pro Patient.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{lidocaine}">Lidocain</span>
				</h4>
				<p>
					<span use:tooltip data-tooltip="Medikament zur Behandlung von abnormen Herzraten">Antiarrythmikum</span>. Verbessert die Erfolgswahrscheinlichkeit des Defibrillators für Patienten in einem defibrillierbaren Zustand. Empfohlen, wenn Amiodaron keine ausreichende Wirkung zeigt.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{atropine}">Atropin</span>
				</h4>
				<p>
					zur Behandlung von <span use:tooltip data-tooltip="dauerhafte Unterschreitung der normalen Herzrate (unter 60 bpm für über 20 Minuten)">Bradykardien</span>. Hebt die Herzrate wesentlich.
				</p>
			</section>
		</section>

		<section id="Spezialisierte Medikationen">
			<p>Die nachfolgenden Medikamente können in speziellen Situationen sehr nützlich sein, sind aber nicht essentiell und sollten daher nur in begrenzten Mengen mitgeführt werden. Im Zweifelsfall sollten stattdessen mehr Bandagen, Infusionsbeutel, Kanülen, etc. der Vorzug gegeben werden.</p>
			<section>
				<h4>
					<span use:tooltip data-tooltip-img="{carbonate}">Ammonium Carbonat</span>
				</h4>
				<p>
					<span use:tooltip data-tooltip="Inhalate werden durch Einatmen eingenommen (inhaliert)">Inhalat</span>, kann stabile Patienten (siehe
					<a href="">Kriterien an Stabilität (dead link)</a>) aus der Bewusstlosigkeit holen. Wird am Kopf angewendet. Im Arsenal bei den Magazinen.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{naloxone}">Naloxon</span>
				</h4>
				<p>
					Morphin-<span use:tooltip data-tooltip="dt. Gegenspieler. Antagonisten wirken einem bestimmten Medikament entgegen.">Antagonist</span>, genutzt zur Therapie von Morphin-Überdosierungen. Eine Gabe Naloxon hemmt die Wirkung einer Gabe Morphin. Verhindert negative Effekte durch Überdosierung, hebt aber auch die schmerzlindernde Wirkung von Morphin auf.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{txa}">Tranexamsäure (TXA)</span>
				</h4>
				<p>treibt die Blutgerinnung voran und verbessert den Wundverschluss von Bandagen. Äquivalent zur Anwendung von QuikClot-Bandagen auf alle Körperteile, alle sechs Sekunden. Die Gesamtwirkdauer beträgt zwei Minuten.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{norep}">Norepinephrin</span>
				</h4>
				<p>hebt den Blutdruck (Vasopressor). Wird über einen Zugang verabreicht.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{nitro}">Nitroglycerin</span>
				</h4>
				<p>senkt den Blutdruck (Vasodepressor). Wird über einen Zugang verabreicht.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{phenylephrin}">Phenylephrin</span>
				</h4>
				<p>hebt den Blutdruck bei gleichzeitiger Sekung des Pulses. Wird über einen Zugang verabreicht.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{ondansetron}">Ondansetron</span>
				</h4>
				<p>verhindert, dass ein bewusstloser Patient sich übergibt. Nützlich, wenn die Atemwege nicht durch eine Güdel-Röhre o.Ä. gesichert werden können. Wird über einen Zugang verabreicht.</p>
			</section>
		</section>

	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
