<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="abteilungen" />
    <h1>Abteilungen</h1>

    <section id="Allgemeines">
      <p>Die Task Force Hellcat ist in drei Abteilungen untergliedert, die jeweils durch einen Abteilungsleiter organisiert und verwaltet werden. Alle Abteilungen umfassen mehrere Truppengattungen, die in diesem Artikel erläutert werden.</p>
    </section>

    <section id="Streitkräfte">
      <p>Die Abteilung der Streitkräfte ist eine der drei Abteilungen der Task Force Hellcat, geleitet von Leon. Sie umfasst insgesamt vier Truppengattungen: Die (motorisierte) Infanterie, den Sanitätsdienst und die Aufklärung.</p>

      <section>
        <h3>(Motorisierte) Infanterie</h3>

        <h3>Sanitätsdienst</h3>

        <h3>Aufklärung</h3>
      </section>

      <ol>
        <li>Die Infanterie besteht aus Soldaten, die sich zu Fuß bewegen. Die motorisierte Infanterie besteht aus Soldaten, die sich aufgesessen auf gepanzerten Fahrzeugen wie <a href="https://de.wikipedia.org/wiki/Mine_Resistant_Ambush_Protected_Vehicle" target="_blank">MRAPs</a> bewegen. Sie beide umfassen die gleichen Rollen: Den Schützen, den MG-Schützen, den Grenadier, den AT-Schützen und den Funker. Infanteristen sind der Grundpfeiler jedes Militärs, da sie vielseitig eingesetzt werden können. Ihre Stärke liegt im Orts- und Häuserkampf, da Fahrzeuge im urbanen Gelände eher ungeeignet sind. Diese Rollen benötigen keine fortgeschrittene Ausbildung, weshalb sie sich gut für Einsteiger eignen. Infanteriegruppen werden von einem Gruppenführer und einem Truppführer geführt.</li>
        <li>Der Sanitätsdienst besteht aus Sanitätern und Ärzten, geleitet von ptolemy. Sie sind meistens innerhalb einer Infanteriegruppe vertreten, aber auch bei Spezialanwendungen wie dem <a href="https://de.wikipedia.org/wiki/MedEvac" target="_blank">MEDEVAC</a> oder dem <a href="https://de.wikipedia.org/wiki/Beweglicher_Arzttrupp" target="_blank">beweglichen Arzttrupp</a>. Die Hauptaufgabe der Sanitäter und Ärzte ist die fortgeschrittene Versorgung von verwundeten Soldaten. Die Rollen des Sanitätsdienstes nehmen komplexe Aufgaben wahr und erhalten dafür eine umfangreiche Ausbildung.</li>
        <li>Die Aufklärung umfasst die Rollen des Scharfschützen, des Spotters und des <a href="https://en.wikipedia.org/wiki/Joint_terminal_attack_controller" target="_blank">JTAC</a>. Alle Rollen der Aufklärung erfordern eine fortgeschrittene Ausbildung. Der Scharfschütze und der Spotter agieren primär im Buddyteam, um feindliche Truppenteile aufzuklären und gegebenenfalls mit präzisem Feuer auf große Distanzen zu bekämpfen. Der JTAC schließt sich im Normalfall einer Infanteriegruppe an, wo er Luftnahunterstützung auf Befehl seines Gruppenführers anfordert.</li>
      </ol>
    </section>

    <section id="Panzertruppen">
      <p>Die Abteilung der Panzertruppen ist eine der drei Abteilungen der Task Force Hellcat, geleitet von Kevin. Sie umfasst insgesamt drei Truppengattungen: Die mechanisierte Infanterie, die Kampfpanzer und die Artillerie. Sie umfasst lediglich drei Rollen: Den Kommandanten, den Richtschützen und den Fahrer. Sie alle erhalten spezielle Ausbildungen, meistens mit dem Fokus auf eine bestimmte Truppengattung. Alle Truppengattungen der Panzertruppen unterscheiden sich stark voneinander, können aber im Verbund gemeinsam agieren.</p>

      <ol>
        <li>Die mechanisierte Infanterie setzt sich aus Panzerbesatzungen und Panzergrenadieren zusammen. Die Fahrzeuge der mechanisierten Infanterie sind meistens stärker gepanzert und bewaffnet als die der motorisierten Infanterie, wie zum Beispiel der <a href="https://de.wikipedia.org/wiki/Stryker_Armored_Vehicle" target="_blank">Stryker</a> oder der <a href="https://de.wikipedia.org/wiki/Puma_(Sch%C3%BCtzenpanzer)" target="_blank">Puma</a>. Die mechanisierte Infanterie vereinigt die Vorteile der Infanterie und der Panzer in einer Truppengattung. Auf der einen Seite die Agilität und Vielfalt der Infanterie, auf der anderen die Mobilität und Feuerkraft des Schützenpanzers.</li>
        <li>Die Truppengattung der Kampfpanzer umfasst alle drei Rollen der Panzertruppen und bedient ausschließlich schwer gepanzerte Fahrzeuge wie den <a href="https://de.wikipedia.org/wiki/M1_Abrams" target="_blank">M1 Abrams</a> oder den <a href="https://de.wikipedia.org/wiki/Leopard_2" target="_blank">Leopard 2</a>. Die Stärke der Kampfpanzer liegt im Angriff und der Verteidigung, besonders gegen feindliche Panzerverbände und befestigte Stellungen.</li>
        <li>Die Artillerie umfasst alle drei Rollen der Panzertruppen und setzt Panzerhaubitzen wie die <a href="https://de.wikipedia.org/wiki/M109_(Panzerhaubitze)" target="_blank">M109</a> oder die <a href="https://de.wikipedia.org/wiki/Panzerhaubitze_2000" target="_blank">Panzerhaubitze 2000</a> ein. Die Artillerie der Panzertruppen wirkt auf große Distanz mit Steilfeuer auf feindliche Truppenteile oder Stellungen. Die fachgerechte Bedienung dieser Waffensysteme erfordert eine fortgeschrittene Ausbildung.</li>
      </ol>
    </section>

    <section id="Logistik">
      <p>Die Abteilung der Logistik ist eine der drei Abteilungen der Task Force Hellcat, geleitet von ?. Sie umfasst insgesamt drei Truppengattungen: Die Instandsetzung, die Versorgung und die Luftlogistik.</p>

      <ol>
        <li>Die Truppengattung der Instandsetzung setzt sich aus Reparaturspezialisten zusammen, die die Gefechtsbereitschaft beschädigter Fahrzeuge wiederherstellen können. Dazu zählen der Rad- und Kettenwechsel sowie die Reparatur von Geschützen, Türmen, Motoren, und so weiter. Die Bergung eigener Fahrzeuge ist eine weitere Aufgabe der Instandsetzung. Die Rolle des Reparaturspezialisten erfordert eine eigene Ausbildung.</li>
        <li>Die Truppengattung der Versorgung besteht aus Logistikern, die vergleichbar ausgerüstet sind wie die Schützen der Infanterie. Ihre Hauptaufgabe ist die Versorgung anderer Truppenteile mit Munition, Treibstoff und Verbrauchsmaterialien mit Bodenfahrzeugen. Voraussetzung für einen erfolgreichen Einsatz ist die fachgerechte Kommunikation mit dem Führungspersonal anderer Truppenteile, sowie der sichere Transport der logistischen Güter zu den eigenen Kräften und zurück.</li>
        <li>Die Luftlogistik hat das gleiche Aufgabenprofil wie die Versorgung. Sie besteht aus Logistikern und Helikopterbesatzungen. Der Unterschied zur Versorgung ist der Transport der logistischen Güter über die Luft. Die Rolle des Helikopterpiloten erfordert eine besondere Ausbildung.</li>
      </ol>
    </section>
  </svelte:fragment>
</Wiki>
