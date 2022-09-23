<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';

	/* images */
	import sixteen_g from '$lib/images/sanitaeter/16g.png'
	import twenty_g from '$lib/images/sanitaeter/20g.png'
	import accuvac from '$lib/images/sanitaeter/accuvac.png'
	import adenosine from '$lib/images/sanitaeter/adenosine.png'
	import aed_x from '$lib/images/sanitaeter/aed_x.png'
	import amiodarone from '$lib/images/sanitaeter/amiodarone.png'
	import atropine from '$lib/images/sanitaeter/atropine.png'
	import bandagen from '$lib/images/sanitaeter/bandagen.png'
	import blood_iv from '$lib/images/sanitaeter/blood_iv.png'
	import blutgruppen from '$lib/images/sanitaeter/blutgruppen.png'
	import bodybag from '$lib/images/sanitaeter/bodybag.png'
	import carbonate from '$lib/images/sanitaeter/carbonate.png'
	import chest_seal from '$lib/images/sanitaeter/chest_seal.png'
	import defib from '$lib/images/sanitaeter/defib.png'
	import elastic_bandage from '$lib/images/sanitaeter/elastic_bandage.png'
	import epinephrine from '$lib/images/sanitaeter/epinephrine.png'
	import fast_io from '$lib/images/sanitaeter/fast_io.png'
	import field_dressing from '$lib/images/sanitaeter/field_dressing.png'
	import guedel from '$lib/images/sanitaeter/guedel.png'
	import infarkt from '$lib/images/sanitaeter/infarkt.png'
	import larynx_normal from '$lib/images/sanitaeter/larynx_normal.png'
	import lidocaine from '$lib/images/sanitaeter/lidocaine.png'
	import morphine from '$lib/images/sanitaeter/morphine.png'
	import naloxone from '$lib/images/sanitaeter/naloxone.png'
	import nitro from '$lib/images/sanitaeter/nitro.png'
	import norep from '$lib/images/sanitaeter/norep.png'
	import ondansetron from '$lib/images/sanitaeter/ondansetron.png'
	import packing_bandage from '$lib/images/sanitaeter/packing_bandage.png'
	import personal_aid_kit from '$lib/images/sanitaeter/personal_aid_kit.png'
	import phenylephrin from '$lib/images/sanitaeter/phenylephrin.png'
	import plasma_iv from '$lib/images/sanitaeter/plasma_iv.png'
	import pulseoximeter from '$lib/images/sanitaeter/pulseoximeter.png'
	import quickclot from '$lib/images/sanitaeter/quickclot.png'
	import saline_iv from '$lib/images/sanitaeter/saline_iv.png'
	import splint from '$lib/images/sanitaeter/splint.png'
	import stabilisierung from '$lib/images/sanitaeter/stabilisierung.png'
	import stethoscope from '$lib/images/sanitaeter/stethoscope.png'
	import surgical_airway_kit from '$lib/images/sanitaeter/surgical_airway_kit.png'
	import surgical_kit from '$lib/images/sanitaeter/surgical_kit.png'
	import tourniquet from '$lib/images/sanitaeter/tourniquet.png'
	import txa from '$lib/images/sanitaeter/txa.png'
	import wolf from '$lib/images/sanitaeter/wolf.png'
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="sanitaeter" />
		<h1>Sanitäter</h1>

		<section>
			<p>
				<i>„Air goes in and out, blood goes round and round. Any deviation from that is a problem.“</i>
			</p>
		</section>
		
		<section id="Rollenprofil">
			<p>
				Im Gefechtsgeschehen sind Verletzungen kaum zu vermeiden. Damit der Trupp dennoch schlagfertig bleibt, gibt es Sanitäter, die den Schaden ungeschehen machen können. Dafür muss ein Sanitäter viele Handlungsabfolgen im Kopf haben, etwa wenn es darum geht, die Situation eines Patienten schnell richtig einzuschätzen, oder Komplikationen wie ein Herzstillstand vorliegen. Dazu verfügt ein Sanitäter über eine breite Ausstattung mit Diagnosewerkzeugen, Bandagen, Medikamenten und Infusionen und ein genauso breites Wissen, wenn es um deren richtige Anwendung geht. Auch liegt es in seiner Verantwortung, der Truppführung Ausfälle zu kommunizieren und bei der Bereitstellung von <a href="../medevac">MEDEVAC</a>s mitzuwirken.
			</p>
		</section>

		<section id="Ausrüstung">
			<ul>
				<li>
					Verbrauchsmaterialien:
					<ul>
						<li><a href="../medikation">Medikamente</a></li>
						<li>Bandagen: siehe <a href="../behandlungen#bandagen">hier</a></li>
						<li>sonstiges <a href="#verbrauchsmaterialien">Verschleißmaterial</a>, etwa Kanülen, Infusionen, Kits, etc.</li>
						<li>Rauchgranaten</li>
					</ul>
				</li>
				<li>
					Gebrauchsgegenstände
					<ul>
						<li><a href="#gebrauchsgegenstaende">medizinischer Art </a></li>
						<li>Fernglas</li>
						<li>Funkgerät</li>
					</ul>
				<li>
					Bewaffnung:
					<ul>
						<li>eine Primärwaffe zur Selbstverteidigung auf kurze bis mittlere Distanzen</li>
						<li>ggf. eine Sekundärwaffe</li>
					</ul>
				</li>
			</ul>
		</section>

		<section id="Fähigkeiten">
			Sanitäter beherrschen neben den Grundlagen der <a href="../erstehilfe">Ersten Hilfe</a> und <a href="../funketikette">Funketikette</a> bzw. <a href="../sanitaeterfunk">Funketikette für Sanitäter</a> auch die <a href="../behandlungen">fortgeschrittenen Behandlungen</a>, welche andere Soldaten nicht leisten können. Außerdem können sie Ausfälle adäquat melden und beherrschen die Besonderheiten des <a href="../sanitaeterfunk">Sanitäterfunks</a>.
		</section>

		<section id="Verbrauchsmaterialien">
			<p>Die folgenden Materialien sind zum einmaligen Gebrauch bestimmt.</p>
			<section>
				<h4>
					<span use:tooltip data-tooltip-img="{surgical_airway_kit}">AAT-Kit</span>
				</h4>
				<p>
					gebraucht zur Behandlung von Hämothoraxen (siehe <a href="../behandlungen#pneumothorax_und_haemothorax">Behandlung</a> von Hämothoraxen und Spannungspneumothoraxen).
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="">Field Blood Transfusion Kit</span> (dt. Feldtransfusionsset)
				</h4>
				<p>
					erlaubt es, im Feld Blut abzunehmen und Bedürftigen zu verabreichen. Siehe dazu <a href="../behandlungen#transfusionen_im_feld">Transfusionen im Feld</a>.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{chest_seal}">Chest Seal</span>
					(dt. Thoraxverschlusspflaster)
				</h4>
				<p>
					ein großes Pflaster mit einem Ein-Weg-Ventil. Das Ventil lässt Luft und Flüssigkeiten aus dem Brustkorb entweichen und verhindert so einen Pneumothorax, siehe <a href="../behandlungen#pneumothorax_und_haemothorax">Behandlung</a> von Hämothoraxen und Spannungspneumothoraxen.
				</p>
				<h4><span use:tooltip data-tooltip-img="{sixteen_g}">16g IV</span></h4>
				<p>
					eine 16g-Kanüle (Durchmesser 1,5 mm) für intravenöse (IV) Zugänge. Wird benötigt, um Flüssigkeiten wie Blutinfusionen, aber auch manche Medikationen zu verabreichen. Diese Nadeln können nicht wiederverwendet werden, wie <a href="https://youtu.be/rzLuZWWZ2eQ" target="_blank">in diesem Video</a> anschaulich gezeigt wird.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{fast_io}">FAST IO</span>
				</h4>
				<p>
					<i>First Access for Shock and Trauma IO,</i> ein
					<span use:tooltip data-tooltip="Bei der intraossären Punktion wird eine Stahlkanüle in den Knochen eingestochen, worüber die Substanzen aufgrund der guten Durchblutung der Knochenmarkhöhle verabreicht werden können.">intraossärer</span> (IO) Zugang am Brustbein. Wird verwendet, wenn die Extremitäten für einen intravenösen Zugang zu stark verletzt sind.
				</p>
			</section>
		</section>

		<section id="Gebrauchsgegenstände">
			<p>Die folgenden Gegenstände sind zur Mehrfachverwendung geeignet.</p>

			<section>
				<h4>
					<span use:tooltip data-tooltip-img="{tourniquet}">Tourniquet</span>
				</h4>
				<p>
					Schnürt die Blutzufuhr eines Körperteils ab, um Blutverlust zu verhindern. <b>Achtung:</b> An Gliedmaßen mit Tourniquet kann kein Puls oder Blutdruck gemessen werden sowie keine Flüssigkeit angelegt werden. Außerdem heißt so ein absoluter Banger von Breaking Benjamin.
				</p>
				<p>Tourniquets sind essentiell zur Selbst- und Kameradenhilfe. Als Sanitäter sollte man seine Kameraden gelegentlich auffordern, zu prüfen, ob sie Tourniquets in ausreichender Anzahl mitführen und gegebenenfalls ausgleichen.</p>
				<h4>
					<h4>
						<span use:tooltip data-tooltip-img="{surgical_kit}">Nähset</span>
					</h4>
				</h4>
				<p>erlaubt das Nähen von Wunden. Genähte Verbände lösen sich nicht mehr.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{stethoscope}">Stethoskop</span>
				</h4>
				<p>erlaubt die Diagnose von Thoraxverletzungen.</p>
				<h4>
					<span use:tooltip data-tooltip-img="{accuvac}">Accuvac</span>
				</h4>
				<p>
					erlaubt die <span use:tooltip data-tooltip="endo: innerhalb; trachea: Luftröhre">endotracheale</span>
					Absaugung von Erbrochenen und befreit so die Atemwege. Höhere Erfolgswahrscheinlichkeit als Ausrichten der Atemwege (<i>head turning</i>).
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{aed_x}">AED / AED-X</span>
				</h4>
				<p>
					<i>Automatisierter externer Defibrillator</i>. Zur Behandlung von
					<span use:tooltip data-tooltip="abnorme Herzrate (etwa Herzkammerflimmern)">Arryhthmien</span>, siehe auch <a href="#Herzinfarkt">Behandlung von Herzstillständen</a>. Die AED-X-Ausführung gestattet zusätzlich das Monitoring von
					<a href="sanitaeter#Vitalparameter">Vitalparametern</a>.
				</p>
				<h4>
					<span use:tooltip data-tooltip-img="{pulseoximeter}">Pulsoximeter</span>
				</h4>
				<p>
					erlaubt die Messung von Puls und des Sauerstoffgehalts des <span use:tooltip data-tooltip="peripher: außen, am Rande. Gemeint sind die Arme und Beine. Pulsoximeter messen an der Fingerkuppe.">peripheren</span>
					Blutes (engl. <i>saturation peripher O&#8322</i>, SpO&#8322). Siehe auch Abschnitt
					<a href="sanitaeter#Vitalparameter">Vitalparameter</a>.
				</p>
			</section>
		</section>

		<section id="Nützliche Hinweise">
			<ul>
				<li>
					Die Waffe muss sehr oft für medizinische Maßnahmen weggelegt werden, außerdem muss das Medical Menu häufig geöffnet werden. Möglicherweise ist es sinnvoll, <kbd>0</kbd> und
					<kbd>H</kbd> auf Maustasten zu legen, oder ähnliches.
				</li>
				<li>
					<kbd>G</kbd> liegt auf der Tastatur neben <kbd>H</kbd>. Da es fatal wäre, beim Versuch, das Medical Menu zu öffnen eine Granate zu werfen, sollte man sich überlegen, als Sanitäter
					<kbd>G</kbd>
					für Granaten zu unbinden und stattdessen zum Beispiel
					<kbd>SHIFT</kbd><kbd>G</kbd> zu verwenden.
				</li>
				<li>Gefangene müssen ebenfalls versorgt werden. Nachdem sie gefesselt wurden, können sie sich nicht mehr selbst verbinden, sollten sich ihre Bandagen lösen.</li>
				<li>Es ist sinnvoll, sich einzuprägen, wo man einen Zugang gelegt hat, um später unnötiges Suchen zu vermeiden. Am besten teilt man dies auch anderen Sanitätern mit, wenn sie einen Patienten übernehmen.</li>

				<li>die <a href="../behandlungen#empfohlene_routinechecks">empfohlenen Routinechecks</a></li>
			</ul>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
