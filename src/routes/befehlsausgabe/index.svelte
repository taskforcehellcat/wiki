<script lang="ts">
	import Wiki from '../wiki.svelte';
	import { tooltip, exampleBox } from '$lib/wikitools/wikitools';
</script>

<svelte:head>
	<title>Home | TFHC Wiki</title>
</svelte:head>

<Wiki>
	<svelte:fragment slot="content">
		<h1>Befehlsausgabe</h1>

		<section id="Einleitung">
			<p>Die Befehlsausgabe erfolgt nach der Gliederung Lage, Auftrag, Durchführung, Einsatzunterstützung und Führungsunterstützung (kurz LADEF). Diese Gliederung wird auf dieser Seite erläutert. Oft erfolgt die Befehlsausgabe im Feld auch in der Form Lage, Auftrag und Durchführung (kurz LAD), da die Punkte Einsatz- und Führungsunterstützung eher für Führungspersonal bedeutsam sind.</p>
		</section>

		<section id="Befehlsschema">
			<section id="1. Lage">
				<section>
					<h3>1.1) Feindliche Lage</h3>
					<p>In diesem Punkt wird über die Lage feindlicher Kräfte im Operationsraum informiert. Dabei werden die Position, die Art und die Absicht des Feindes genauer beschrieben.</p>
					<div use:exampleBox>
						<p>
							„<i>In der Stadt Kavala im Nordwesten von Altis ist ein feindlicher Infanteriezug in Stellung. Davon befindet sich ein Halbzug im Nordosten und ein Halbzug um Südwesten der Stadt. Vermutete Absicht des Zuges ist die Verteidigung einer zentralen Hafenanlage der Insel.</i>“
						</p>
					</div>

					<h3>1.2) Eigene Lage</h3>
					<p>In diesem Punkt wird über die Lage eigener Kräfte informiert. Dabei wird auf die Position und Art der eigenen Kräfte eingegangen. Des Weiteren kann hier die Absicht des Führungspersonals mitgeteilt werden.</p>
					<div use:exampleBox>
						<p>
							„<i
								>Ein mechanisierter Infanteriezug und ein Infanteriehalbzug der Task Force Hellcat befinden sich aktuell im Verfügungsraum <span use:tooltip data-tooltip="Meter">5000</span>
								östlich von Kavala. Absicht des Zugführers ist der Angriff in <b>drei</b> Phasen. In
								<b>Phase 1</b>
								nimmt der erste mechanisierte Halbzug den Südwesten Kavalas, der zweite mechanisierte Halbzug den Nordosten Kavalas. In <b>Phase 2</b> verteidigt der erste mechanisierte Halbzug den Südwesten Kavalas, der zweite mechanisierte Halbzug verteidigt den Nordosten Kavalas. In <b>Phase 3</b> nimmt der Infanteriehalbzug das Zentrum Kavalas. Absicht des Angriffs ist der Zugang zu einer zentralen Hafenanlage der Insel Altis.</i
							>“
						</p>
					</div>

					<h3>1.3) Zivile Lage</h3>
					<p>In diesem Punkt wird über die Lage von Zivilisten im Operationsraum informiert. Dabei wird auf das Verhalten der Zivilisten gegenüber dem Feind und eigenen Kräften eingegangen.</p>
					<div use:exampleBox>
						<p>
							„<i>Die Zivilbevölkerung im Raum Kavala geht dem Alltäglichen nach. Zivilisten meiden den Kontakt zu feindlichen Kräften und treten den eigenen Kräften neutral gegenüber.</i>“
						</p>
					</div>
				</section>
			</section>

			<section id="2. Auftrag">
				<p>
					In diesem Punkt erfolgt eine knappe Darlegung des <span use:tooltip data-tooltip="z.B. eines Zuges oder einer Gruppe">eigenen</span> Auftrags. Das geschieht in Form einer stichpunktartigen Aufzählung, was erledigt werden muss. Hauptsächlich wird dieser Punkt auf Zugebene besprochen.
				</p>
				<div use:exampleBox>
					<p>„<i>Der Infanteriehalbzug nimmt das Zentrum der Stadt Kavala.</i>“</p>
				</div>
			</section>

			<section id="3. Durchführung">
				<p>
					In diesem Punkt werden die Einzelaufträge der <span use:tooltip data-tooltip="z.B. die Gruppen eines Zuges">unterstellten Truppenteile</span>
					erläutert. Dabei geht der Zug- bzw. Gruppenführer genauer auf die Vorgehensweise bei der Erfüllung des Auftrages ein. Zusätzlich können hier
					<span use:tooltip data-tooltip="z.B. Funkkreiseröffnung">wichtige Zeiten</span>
					oder
					<span use:tooltip data-tooltip="z.B. Einsatz von gelenkten Raketen nur auf Befehl">Verhaltensweisen</span> mitgeteilt werden.
				</p>
				<div use:exampleBox>
					<p>
						„<i>Die beiden Halbzüge des mechanisierten Infanteriezuges bewegen sich nebeneinander auf Kavala zu. Ab Ablauflinie Adler trennen sich die beiden Halbzüge und bewegen sich jeweils auf den ihnen zugewiesenen südwestlichen beziehungsweise nordöstlichen Teil Kavalas zu und nehmen diesen.</i>“
					</p>
				</div>
			</section>

			<section id="4. Einsatzunterstützung">
				<section>
					<h3>4.1) Logistische Unterstützung</h3>
					<p>
						In diesem Punkt wird über Maßnahmen und Einrichtungen der <span use:tooltip data-tooltip="z.B. Munition und SanMat für Soldaten oder Instandhaltung der Fahrzeuge">Versorgung</span> informiert.
					</p>
					<div use:exampleBox>
						<p>
							„<i>Verbrauchsmaterial und Ersatzketten befinden sich auf den Schützenpanzern der mechanisierten Infanterie. Zur Versorgung des Infanteriehalbzuges steht ein Unimog mit Verbrauchsmaterial bereit.</i>“
						</p>
					</div>

					<h3>4.2) Sanitätsdienstliche Unterstützung</h3>
					<p>In diesem Punkt wird über Möglichkeiten der Versorgung verwundeter Kräfte informiert.</p>
					<div use:exampleBox>
						<p>
							„<i>Vorrangig erfolgt die Versorgung verwundeter Soldaten im Feld durch Selbst- und Kameradenhilfe. Jeder Panzergrenadiertrupp und beide Gruppen des Infanteriehalbzuges verfügen jeweils über einen Sanitäter. Für medizinische Notfälle steht ein <span use:tooltip data-tooltip="kurz: BAT">beweglicher Arzttrupp</span> aufgesessen auf einem Unimog bereit.</i>“
						</p>
					</div>
				</section>
			</section>

			<section id="5. Führungsunterstützung">
				<section>
					<h3>5.1) Funkverbindungsplan</h3>
					<p>In diesem Punkt wird über die Zuweisung der Funkgeräte, der Funkfrequenzen und der Aufteilung der Funkrufzeichen informiert.</p>
					<div use:exampleBox>
						<p>
							„<i>Der Kompaniekreis befindet sich auf der SEM 70 mit der Frequenz 60.000 MHz. Im Zugkreis wird das Funkgerät AN/PRC-152 verwendet. Dabei ist für den mechanisierten Infanteriezug Kanal 01 und für den Infanteriehalbzug Kanal 02 reserviert. Auf Gruppenebene wird mit der SEM 52 SL gefunkt. Für die vier Gruppen des mechanisierten Infanteriezuges sind Kanäle 01 bis 04 reserviert. Der Infanteriehalbzug verteilt sich auf den Kanälen 05 und 06.</i>“
						</p>
						<p>
							„<i>Der mechanisierte Infanteriezug ist in ALPHA und der Infanteriehalbzug in BRAVO eingeteilt.</i>“
						</p>
					</div>

					<h3>5.2) Führungsreihenfolge</h3>
					<p>In diesem Punkt wird über die Einteilung der Führungsübernahme bei einem Ausfall der Führungsperson informiert.</p>

					<div use:exampleBox>
						<p>
							„<i>Die Kompanieführung beginnt beim Zugführer von ALPHA. Fällt dieser aus, übernimmt der Gruppenführer von ALPHA-2. Im Falle seines Ausfalls übernimmt der Zugführer von BRAVO die Kompanie.</i>“
						</p>
					</div>
				</section>
			</section>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="editdate">23.06.2022</svelte:fragment>
</Wiki>
