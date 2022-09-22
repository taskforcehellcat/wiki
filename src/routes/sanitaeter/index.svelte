<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';
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
				Im Gefechtsgeschehen sind Verletzungen kaum zu vermeiden. Damit der Trupp dennoch schlagfertig bleibt, gibt es Sanitäter, die den Schaden ungeschehen machen können. Dafür muss ein Sanitäter viele Handlungsabfolgen im Kopf haben, etwa wenn es darum geht, die Situation eines Patienten schnell richtig einzuschätzen, oder Komplikationen wie ein Herzstillstand vorliegen. Dazu verfügt ein Sanitäter über eine breite Ausstattung mit Diagnosewerkzeugen, Bandagen, Medikamenten und Infusionen und ein genauso breites Wissen, wenn es um deren richtige Anwendung geht. Auch liegt es in seiner Verantwortung, der Truppführung Ausfälle zu kommunizieren und bei der Bereitstellung von <a href="">MEDEVAC</a>s mitzuwirken.
			</p>
		</section>

		<section id="Ausrüstung">
			<ul>
				<li>
					Verbrauchsmaterialien:
					<ul>
						<li><a href="../medikation">Medikamente</a></li>
						<li>Bandagen: siehe <a href="">Verletzungen</a></li>
						<li>sonstiges <a href="">Verschleißmaterial</a>, etwa Kanülen, Infusionen, Kits, etc.</li>
						<li>Rauchgranaten</li>
					</ul>
				</li>
				<li>
					Gebrauchsgegenstände
					<ul>
						<li><a href="">medizinischer Art </a></li>
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
				<li>
					Fuhrpark

				</li>
			</ul>
		</section>

		<section id="Fähigkeiten">
			Sanitäter beherrschen neben den Grundlagen der <a href="../erstehilfe">Ersten Hilfe</a> und <a href="../funketikette">Funketikette</a> bzw. <a href="">Funketikette für MEDEVAC (wip)</a> auch die <a href="../behandlungen">fortgeschrittenen Behandlungen</a>, welche andere Soldaten nicht leisten können. Außerdem können sie Ausfälle adäquat melden und beherrschen die Besonderheiten des <a href="../sanitaeterfunk">Sanitäterfunks</a>.
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

				<li>die <a href="../behandlung#Empfohlene Routinechecks">empfohlenen Routinechecks</a></li>
			</ul>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">22.09.2022</svelte:fragment>
</Wiki>
