<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { tooltip } from "../wikitools";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="abteilungen" />
    <h1>Abteilungen</h1>

    <section id="Allgemeines">
      <p>Die Task Force Hellcat ist in drei Abteilungen untergliedert, die jeweils durch einen Abteilungsleiter organisiert und verwaltet werden. Alle Abteilungen umfassen mehrere Truppengattungen, die auf dieser Seite erläutert werden.</p>
    </section>

    <section id="Streitkräfte">
      <p>Die Abteilung der Streitkräfte wird von Leon organisiert und verwaltet. Sie umfasst insgesamt vier Truppengattungen: Die (motorisierte) Infanterie, den Sanitätsdienst und die Aufklärung.</p>

      <section>
        <h3>(Motorisierte) Infanterie</h3>
        <p>Die Infanterie setzt sich aus Schützen, MG-Schützen, AT-Schützen, Präzisionsschützen, Funkern und Grenadieren zusammen. Ihre Bewegung und der Feuerkampf erfolgen ausschließlich zu Fuß. Alternativ können sich die Soldaten auf Fahrzeugen aufgesessen bewegen, auch motorisierte Infanterie genannt. Die Infanterie kann vielseitig eingesetzt werden. Sie erweist sich besonders im <span use:tooltip data-tooltip="städtisch">urbanen Gebiet</span> und <span use:tooltip data-tooltip="Wälder oder Steinformationen">unwegsamen Gelände</span> als effektiv, da Fahrzeuge dort nur eingeschränkt beweglich sind.</p>

        <h3>Sanitätsdienst</h3>
        <p>Der Sanitätsdienst setzt sich aus Sanitätern und Ärzten zusammen. Er wird von ptolemy organisiert und verwaltet. Sanitäter sind in Trupps und Gruppen der Infanterie vertreten und übernehmen die fortgeschrittene Versorgung von verwundeten Soldaten im Feld. Ärzte sind vorwiegend bei Spezialanwendungen wie dem <span use:tooltip data-tooltip="dt. Medizinische Evakuierung, oft per Helikopter">MEDEVAC</span> oder dem <span use:tooltip data-tooltip="Beweglicher Arzttrupp">BAT</span> anzutreffen.</p>

        <h3>Aufklärung</h3>
        <p>Die Aufklärung setzt sich aus Scharfschützen, <span use:tooltip data-tooltip="dt. Beobachter">Spottern</span> und <span use:tooltip data-tooltip="Joint Terminal Attack Controller">JTACs</span> zusammen. Scharfschützen und Spotter sind meist im Trupp oder Buddy-Team zur Aufklärung oder Bekämpfung feindlicher Kräfte auf große Distanzen anzufinden. JTACs sind entweder im Aufklärungstrupp oder in Infanteriegruppen vertreten. Ihre Hauptaufgabe ist die Koordinierung vom <span use:tooltip data-tooltip="Close Air Support, dt. Luftnahunterstützung">CAS</span> auf feindliche Ziele.</p>
      </section>
    </section>

    <section id="Panzertruppen">
      <p>Die Abteilung der Streitkräfte wird von Kevin organisiert und verwaltet. Sie umfasst insgesamt drei Truppengattungen: Die mechanisierte Infanterie, die Kampfpanzer und die Artillerie. Alle Truppengattungen der Panzertruppen umfassen drei Rollen: Den Kommandanten, den Richtschützen und den Fahrer.</p>

      <section>
        <h3>Mechanisierte Infanterie</h3>
        <p>Die mechanisierte Infanterie setzt sich aus Panzerbesatzungen und Panzergrenadieren zusammen, wobei die Panzergrenadiere die gleichen Rollen vertreten wie die Infanterie. Sie vereinigt die <span use:tooltip data-tooltip="Agilität und Effizienz im urbanen Gebiet">Vorteile der Infanterie</span> mit den <span use:tooltip data-tooltip="Mobilität, Schutz und Feuerkraft">Vorteilen der Schützenpanzer</span> in einer Truppengattung.</p>

        <h3>Kampfpanzer</h3>
        <p>Die Soldaten der Kampfpanzer bedienen ausschließlich Fahrzeuge mit guter Panzerung und überwältigender Feuerkraft. Kampfpanzer sind besonders gut gegen feindliche Panzerverbände und befestigte Stellungen geeignet, erweisen sich jedoch als äußerst ineffektiv im urbanen Gelände. Oft agieren Kampfpanzer gemeinsam mit der mechanisierten Infanterie, um die Schwachstellen der Kampfpanzer zu kompensieren.</p>

        <h3>Panzerartillerie</h3>
        <p>Die Artillerie setzt Panzerhaubitzen mit schweren Geschützen ein. Sie wirken auf große Distanz mittels gelenktem oder ungelenktem Steilfeuer auf feindliche Kräfte oder Stellungen. Um eine präzise Wirkung zu erzielen erfordert es eine gute Kommunikation zu eigenen Kräften im Operationsraum, die der Artillerie den Feuerbefehl erteilen.</p>
      </section>
    </section>

    <section id="Logistik">
      <p>Die Abteilung der Logistik wird von ? organisiert und verwaltet. Sie umfasst insgesamt drei Truppengattungen: Die Instandsetzung, die Versorgung und die Luftlogistik.</p>

      <section>
        <h3>Pioniertruppe</h3>
        <p>Die Pioniertruppe setzt sich aus Pionieren und Kampfpionieren zusammen. Die Hauptaufgabe der Pioniere ist die Wartung, Bergung und Instandsetzung eigener Fahrzeuge. Zusätzlich kann es auch zu Spezialanwendungen kommen, wie zum Beispiel der Einsatz eines Brückenlegepanzers durch die Pioniertruppe.</p>

        <h3>Versorgung</h3>
        <p>Die Truppengattung der Versorgung befasst sich mit der Versorgung anderer Truppenteile mit Bodenfahrzeugen. Häufig transportiert werden Güter wie Munition, Treibstoff und Verbrauchsmaterialien. Gegebenenfalls kann die Versorgung auch eigene Kräfte ins Feld verlegen.</p>

        <h3>Luftversorgung</h3>
        <p>Die Luftlogistik befasst sich im Kern mit der Versorgung anderer Truppenteile mit Luftfahrzeugen. Transportierte Güter sind hierbei Munition, Treibtstoff und Verbrauchsmaterialien. Die Luftversorgung kann sich ebenfalls mit der Verlegung eigener Kräfte ins Feld befassen.</p>
      </section>
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">21.06.2022</svelte:fragment>
</Wiki>
