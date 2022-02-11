<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <h1>Panzertruppen</h1>

    <section id="Allgemeines">
      <p>Die Abteilung der Panzertruppen ist eine Zusammensetzung aus Panzerbesatzungen bestehend aus Kommandanten, Richtschützen und Fahrern sowie vielfältigen Fahrzeugklassen und Waffensystemen. Ihre Anforderungsbereiche reichen vom modernen Panzerkampf über den Orts- und Häuserkampf mit den Streitkräften bis hin zur Feuerunterstützung der Streitkräfte durch Artilleriefeuer. Alle Spieler der Panzertruppen durchlaufen Ausbildungen, die jeweils auf bestimmte Fahrzeugklassen ausgerichtet sind. Nach Beendigung der Ausbildung können die Spieler an Events mit ihrer Fahrzeugklasse teilnehmen. Neben den Ausbildungen und den Events finden Übungen statt, die speziell für die Panzerbesatzungen der Panzertruppen vorgesehen sind.</p>
    </section>

    <section id="Fahrzeugklassen">
      <p>Die Panzertruppen verfügen über unterschiedlichste Fahrzeugklassen mit vielfältigen Spezialisierungen, wie den Kampfpanzer (KPz/MBT), den Schützenpanzer (SPz/IFV), den Flugabwehrpanzer (FlakPz/SPAAG), die Panzerartillerie (PzAr/SPG) und die Raketenartillerie (RkAr/MS). Jede Fahrzeugklasse ist für die unterschiedlichsten Anwendungsbereiche vorgesehen, wodurch sich das Spielerlebnis massiv unterscheidet. Je nach Auftrag eines Einsatzes können die Fahrzeugklassen auch gemeinsam agieren, um die höchstmögliche Kampfeffizienz zu erzielen.</p>
    </section>

    <section id="Besatzungsmitglieder">
      <p>Die Panzerbesatzungen der Panzertruppen setzen sich im Normalfall aus jeweils drei Spielern zusammen. Der Kommandant hat die Befehlsgewalt und trägt die Verantwortung für sein Fahrzeug und seine Besatzung. Die Erfüllung des Einsatzauftrages ist durch den Informationsfluss mit verbündeten Kräften, der Befehlserteilung und der Einhaltung von Befehlen des Panzerzugführers durch ihn zu erreichen. Die Kraftfahrer der Panzertruppen nehmen unmittelbaren Einfluss auf die Bewegung ihres Fahrzeuges. Ihre Aufgabe ist das Manövrieren des Fahrzeuges entsprechend der Anweisungen ihrer Kommandanten. Die Richtschützen der Panzertruppen bedienen die Waffenanlage ihrer Fahrzeuge entsprechend der Anweisungen ihres Kommandanten. Sie sind unmittelbar an der Aufklärung und Bekämpfung von Feindkräften sowie der Deckung eigener Truppen beteiligt.</p>
    </section>

    <section id="Führungskette">
      <p>Zur Wahrung von Struktur und Ordnung während eines Einsatzes gibt es bei den Panzertruppen eine klare Hierarchie. Alle Fahrer und Richtschützen der Panzertruppen sind das unterste Glied der Führungskette. Ihr Vorgesetzter ist ihr Kommandant, der ihnen Befehle erteilt. Alle Kommandanten eines Panzerzuges unterstehen dem jeweiligen Panzerzugführer. Seine Verantwortung liegt in der Koordination und Führung des ganzen Panzerzuges, während er eine Funkverbindung zu den Führungselementen und anderen unterstützenden Elementen hält. Die Kommunikation der Führungskette ist intuitiv: Die Befehle werden von der Führungsebene bis zum unterstem Glied der Führungskette weitergegeben. Aus der entgegengesetzten Richtung stammen Meldungen, Fragen, Statusberichte, etc. der Panzerbesatzungen.</p>
    </section>

    <section id="Formalitäten">
      <p>Feindliche Kräfte werden innerhalb der Panzertruppen gemäß der REZ-Regel gemeldet. Eine Feindmeldung erfolgt durch die <i>Richtungsangabe</i>, <i>Entfernungsangabe</i> und der <i>Zieldefinition des Feindes</i>. Die Richtungsangabe erfolgt im Normalfall entsprechend einer Uhrzeit relativ zur Fahrzeugwanne oder in Gradzahlen. Die Entfernungsangabe wird in Hundert übergeben, also wird "1200 Meter" zu "Zwölfhundert Meter". Ausnahmen sind hierbei Tausenderzahlen wie 1000, 2000, usw. Die Zieldefinition erfolgt als Typdefinition des Feindes. Eine feindliche Infanteriegruppe wird als solche gemeldet und ein Fahrzeug wird entsprechend der vorgesehenen Akronyme durchgegeben.</p>
      <p>Die im Normalfall aus vier Fahrzeugen derselben Fahrzeugklasse bestehenden Panzerzüge der Panzertruppen können in den unterschiedlichsten Formen vorkommen. Neben der Formierung von verminderten oder verstärkten Panzerzügen kann die Bildung eines Sonderzuges erfolgen. Ein Sonderzug ist ein Kampfverband, der aus unterschiedlichen Fahrzeugklassen zusammengesetzt ist. Die Zusammenschließung oder Neubildung von Panzerzügen kann während des Einsatzes durch die Führungskraft der Panzertruppen erfolgen.</p>
    </section>

    <section id="Funk">
      <p>Die Kommunikation der Panzertruppen hat einen immensen Einfluss auf ihre Effizienz und Wirkung. Der Funk muss nach dem Leitsatz "So viel wie nötig, so wenig wie möglich" erfolgen. Das konkrete Ziel eines Kampfverbandes ist die Bündelung der Feuerkraft und das gegenseitige Schützen.</p>
      <p>Die Kommunikation der Panzertruppen erfolgt über drei Funkkanäle. Der Bordfunk ist ein interner Funkkanal innerhalb eines Fahrzeuges, in dem alle Besatzungsmitglieder miteinander kommunizieren können. Der taktische Funkkanal wird von jedem Besatzungsmitglied eines Zuges genutzt. Der taktische Funkkanal wird vom Zugführer genutzt um möglichst schnell Befehle an Fahrer oder Schützen aller Fahrzeuge seines Zuges zu erteilen. In ihm können Formationswechsel, Geschwindigkeitsjustierungen, Feindmeldungen, Primärziele und Feuerkoordinationen übergeben werden. Der Kommandantenfunkkanal wird von den Kommandanten eines Panzerzuges genutzt, um die Panzerbesatzungen zu entlasten und ein Funkchaos zu vermeiden. Über ihn werden Informationen vermittelt, die keinen unmittelbaren Einfluss auf den aktiven Kampf haben. Dazu zählen Informationen zur Missionsentwicklung, zum Munitionsstand, Schadensberichte an Fahrzeugen, Treibstoffvorräte, Abschüsse, Einzelbefehle, Statusmeldungen, Melden der Einsatzbereitschaft oder Vorschläge.</p>
    </section>
  </svelte:fragment>
</Wiki>
