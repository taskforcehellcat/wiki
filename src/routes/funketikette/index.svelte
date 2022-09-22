<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip } from '$lib/wikitools/wikitools';

	/* images */
	import alphabet from '$lib/images/funketikette/alphabet.png'
	import funk_aceself from '$lib/images/funketikette/funk_aceself.png'
	import semSL from '$lib/images/funketikette/sem52sl.png'
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<article id="funketikette" />
		<h1>Funketikette</h1>

		<section id="Einleitung">
			<p>Grundvoraussetzung für eine gelungene Missionsdurchführung ist eine gute Kommunikation zwischen allen Kräften. Über längere Strecken und Einheiten hinweg nutzt man den Funk. Die Grundzüge von gutem Funken sollten allen Soldaten bekannt sein.</p>
			<p>Diese Anleitung vermittelt bloß die absoluten Grundlagen des Funkens. Je nach Spezialisierung sind noch weitere Dinge relevant, wie etwa beim Funken im Konvoi und zwischen der Logistik, im Funk unter Truppführern, Sanitätern oder Aufklärern. Dazu finden sich Einträge mit weiterführenden Informationen auf den jeweiligen Unterseiten.</p>
		</section>

		<section id="Steuerung">
			<p>
				Über die ACE Self-Interaction (<kbd>LCTRL</kbd>+<kbd>WIN</kbd>/<kbd>LCTRL</kbd>+<kbd>LCMD</kbd>) können unter dem Punkt Radio die Funkgeräte eingestellt werden, siehe dazu auch untenstehendes Bild. Wählt man das Funkgerät aus, so öffnet es sich (siehe <a href="#Funkgerät einstellen">Funkgerät einstellen</a>). Die Unterpunkte werden im Folgenden erklärt.
			</p>

			<a href="{funk_aceself}" target="_blank" class="no-underline"><img src="{funk_aceself}" alt="Radioauswahl in der ACE Self Interaction" /></a>

			<section id="Funkgerät einstellen">
				<section id="SEM 52 SL">
					<p>
						Infanterie ist zumeist mit dem Funkgerät <span use:tooltip data-tooltip="Akronym für: Sender/Empfänger, mobil (Synthesizer mit LCD)"><i>SEM 52 SL</i></span> ausgerüstet, deren Bedienelemente untenstehendes Bild zeigt. Sie bestehen im Wesentlichen aus zwei Drehknöpfen und einer Anzeige. Letztere zeigt die aktuell genutze Frequenz in kHz (Kilohertz), standardmäßig sind 46 MHz eingestellt. Die Drehknöpfe werden mit Links- und Rechtsklick nach links bzw. rechts verstellt.
					</p>
					<p>Der linke Drehknopf dient neben dem Einschalten dem Auswählen von Voreinstellungen. Die zwölf standardmäßigen Voreinstellungen bezeichnen wir auch als Kanäle. Die Einstellungen P und H dienen der Programmierung des Funkgeräts, was im Allgemeinen aber nicht notwendig werden sollte.</p>
					<p>
						Der rechte Drehknopf ist die Lautstärkeeinstellung mit zwölf Stufen. Zwischen beiden Drehknöpfen befindet sich ein Knopf zum Senden (praktisch verwendet man ohne dafür ohne das Funkgerät öffnen zu müssen die Taste <kbd>CAPS LOCK</kbd>).
					</p>

					<a href="{semSL}" target="_blank" class="no-underline"><img src="{semSL}" alt="Oberfläche der SEM 52 SL" /></a>

					<p>
						Alle weiteren Informationen zur SEM 52 SL und allen weiteren ACRE Funkgeräten finden sich auch in englischer Sprache im <a href="https://acre2.idi-systems.com/wiki/radios/overview" target="_blank">ACRE Wiki</a>.
					</p>
				</section>

				<section id="AN/PRC 343">
					<p>
						<a href="https://acre2.idi-systems.com/wiki/radios/an-prc-343" target="_blank">ACRE Wiki Eintrag zum AN/PRC 343</a> in englischer Sprache.
					</p>
				</section>
			</section>

			<section id="Weitere Einstellungen">
				<p>Je nach Präferenz kann man ein Funkgerät auf das rechte, linke oder beide Ohren legen. Besonders, wenn man mehrere Funkgeräte gleichzeitig benutzt kann dies sinnvoll sein, um unterscheiden zu können, von welchem Funkgerät gerade Funk eingeht.</p>
				<p>Die Option „share“ ermöglicht es, mit einer anderen Person das Funkgerät zu teilen, solange sie in der Nähe ist, ohne dafür das Funkgerät aus dem Inventar geben zu müssen.</p>
				<p>
					Führt man mehrere Funkgeräte, gibt es zudem die Option „PPT“. Mit dem Funkgerät PPT1 funkt man mit <kbd>CAPS LOCK</kbd>, über PPT2 mit <kbd>SHIFT</kbd>+<kbd>CAPS LOCK</kbd> und über PPT3 mit <kbd>ALT</kbd>+<kbd>CAPS LOCK</kbd>.
				</p>
			</section>
		</section>

		<section id="Vor dem Funken">
			<p>
				Noch bevor man beginnt, Funkkontakt aufzubauen, überlegt man sich genau, was man mitteilen möchte. Ein Sender blockiert für die Dauer seines Funkspruches den Funkkanal und damit möglicherweise andere eilige Meldungen. Darum sollte ein Funkspruch gut formuliert, knapp, aber unmissverständlich gehalten werden. Guter Funk folgt also der Devise: <i>So viel wie nötig, so kurz wie möglich.</i>
			</p>
		</section>

		<section id="Verbindung">
			<p>Das Herstellen des Funkkontakts nennt man auch Verbindung. Sie folgt einem einfachen Schema: Der Sender identifiziert sich und den Empfänger des Funkspruches. Danach wird in einem Wort erklärt, welchen Zweck die Mitteilung verfolgt. Zum Beispiel:</p>
			<p>„Aufklärung für Truppführung - Information - Infanterie in Gruppenstärke zu Fuß gesichtet nord-west ihrer Aktuellen - Kommen.“</p>
			<p>„Truppführung für Aufklärung - Frage - Panzerabwehrschützen erkannt? Kommen.“</p>
			<p>Dies stellt eine Richtlinie für die Erstverbindung dar. Im weiteren Gesprächsverlauf ist es eventuell nicht mehr nötig, so explizit zu sein, da dann bereits klar ist, worum es geht. Gerade zu Beginn des Funkkontakts kann es dem Gegenüber jedoch das Verständnis erleichtern, wenn man seine Absicht ausspricht.</p>
		</section>

		<section id="Funkspruch">
			<p>Der eigentliche Inhalt des Funkspruches folgt den oben beschriebenen Grundsätzen: er sollte knapp, aber eindeutig sein. Besonders Füllwörter und häufiges Versprechen können leicht vermieden werden, indem man sich den Inhalt seines Funkes vor dem Funken kurz überlegt. Abgesehen davon gibt es noch ein paar Konventionen, die das Verständnis erleichtern sollen.</p>

			<section id="Zahlen">
				<p>Zahlen werden im Funk grundsätzlich Ziffer für Ziffer diktiert, „1278“ also als „eins - zwo - sieben - acht“ gesprochen. „Zwo“ ist dabei dringend zu benutzen, da „zwei“ leicht mit „drei“ verwechselt wird. Ebenso verwendet man „fünnüf“ für „fünf“.</p>
			</section>

			<section id="Windrichtungen">
				<p>
					Da die Windrichtungen Osten und Westen sehr ähnlich klingen, spricht man die erste Silbe im Gegensatz zur natürlichen Aussprache lang. Also zum Beispiel: „nord-<u>oh</u>st“ für nord-ost, „süd-<u>weh</u>st“ für süd-west, etc.
				</p>
			</section>

			<section id="Buchstabieren">
				<p>Buchstabieren wird oft nötig werden. Einzelne Buchstaben sind dabei selbst bei guter Verbindung kaum zu verstehen. Wir verwenden daher zum Buchstabieren das NATO-Alphabet.</p>

				<a href="{alphabet}" class="no-underline" target="_blank"><img src="{alphabet}" alt="NATO-Buchstabiertafel" /></a>

				<p>Da es auch außerhalb des Funkes viel benutzt wird, sollte man sich das NATO-Alphabet dringend aneignen.</p>
			</section>
		</section>

		<section id="Beendigung">
			<p>Hat man alles gesagt, muss man auch das dem Funkkreis signalisieren. Andere halten das Gespräch ansonsten für unbeendet und halten Funkstille. Hierzu gibt es eine Reihe von Signalwörtern:</p>

			<section id="Kommen">
				<p>Mit „kommen“ am Ende eines Funkspruches zeigt man an, dass man eine Antwort vom Gegenüber erwartet. Man benutzt es auch nach dem Beantworten einer Frage.</p>
			</section>

			<section id="Ende">
				<p>Mit „ende“ beendet man den Austausch. „Ende“ wird von der Partei gebraucht, die den Austausch begonnen hat.</p>
			</section>

			<section id="Trennung">
				<p>„Trennung“ ist effektiv ein „ende“. Es zeigt dem Funkkreis an, dass der Sprecher das Gespräch mit einer Partei für beendet erklärt, aber direkt zu einer Anderen Kontakt aufnehmen möchte. Es folgt auf „Trennung“ also direkt die Verbindung zum neuen Gesprächspartner.</p>
			</section>
		</section>

		<section id="Ausnahmen und Notfälle">
			<p>Grundsätzlich herrscht während eines laufenden Austausches Funkstille für alle anderen. Kommt es jedoch zu Notfällen, kann es sein, dass ein Dritter sich mit Signalwörtern wie „eil“, „sofort“ oder „Blitz“ einschaltet. Dies bedeutet offensichtlich eine Notlage und das laufende Gespräch ist zu unterbrechen.</p>
		</section>

		<section id="Weiterführende Informationen">
			<ul>
				<li><a href="../sanitaeterfunk">Sanitäterfunk</a></li>
				<li><a href="">Funk der Panzertruppen (wip)</a></li>
			</ul>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">09.07.2022</svelte:fragment>
</Wiki>
