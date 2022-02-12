<script lang="ts">
  import Wiki from "../Wiki.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <h1>Grundlagen des Funkens</h1>

    <section id="Einleitung">
      <p>Grundvoraussetzung für eine gelungene Missionsdurchführung ist eine gute Kommunikation zwischen allen Kräften. Über längere Strecken und Einheiten hinweg nutzt man den Funk. Die Grundzüge von gutem Funken sollte allen Soldaten bekannt sein.</p>
    </section>

    <section id="Vor dem Funken">
      <p>Noch bevor man beginnt, Funkkontakt aufzubauen, überlegt man sich genau, was man mitteilen möchte. Ein Sender blockiert für die Dauer seines Funkspruches den Funkkanal und damit möglicherweise andere eilige Meldungen. Darum sollte ein Funkspruch gut formuliert, knapp, aber unmissverständlich gehalten werden. Guter Funk folgt also der Devise: <i>So viel wie nötig, so kurz wie möglich.</i></p>
    </section>

    <section id="Verbindung">
      <p>Das Herstellen des Funkkontakts nennt man auch Verbindung. Sie folgt einem einfachen Schema: Der Sender identifiziert sich und den Empfänger des Funkspruches. Danach wird in einem Wort erklärt, welchen Zweck die Mitteilung verfolgt. Zum Beispiel:</p>
      <p>„Aufklärung für Truppführung - Information - Infanterie in Gruppenstärke zu Fuß gesichtet nord-west ihrer Aktuellen - Kommen.“</p>
      <p>„Truppführung für Aufklärung - Frage - Panzerabwehrschützen erkannt? Kommen.“</p>
      <p>Dies stellt eine Richtlinie für die Erstverbindung dar. Im weiteren Gesprächsverlauf ist es eventuell nicht mehr nötig, so explizit zu sein, da dann bereits klar ist, worum es geht. Gerade zu Beginn des Funkkontakts kann des dem Gegenüber jedoch das Verständnis erleichtern, wenn man seine Absicht ausspricht.</p>
    </section>

    <section id="Funkspruch">
      <p>Der eigentliche Inhalt des Funkspruches folgt den oben beschriebenen Grundsätzen: er sollte knapp, aber eindeutig sein. Besonders Füllwörter und häufiges Versprechen können leicht vermieden werden, indem man sich den Inhalt seines Funkes vor dem Funken kurz überlegt. Abgesehen davon gibt es noch ein paar Konventionen, die das Verständnis erleichtern sollen.</p>
      <section>
        <h3>Zahlen</h3>
        <p>Zahlen werden im Funk grundsätzlich Ziffer für Ziffer diktiert, „1278“ also als „eins - zwo - sieben - acht“ gesprochen. „Zwo“ ist dabei dringend zu benutzen, da „zwei“ leicht mit „drei“ verwechselt wird. Ebenso verwendet man „fünnüf“ für „fünf“.</p>

        <h3>Buchstabieren</h3>
        <p>Buchstabieren wird oft nötig werden. Einzelne Buchstaben sind dabei selbst bei guter Verbindung kaum zu verstehen. Wir verwendet daher zum Buchstabieren das NATO-Alphabet.</p>
        <!-- Hier NATO Alphabet einfühen. Wie macht man Tabellen am besten? -->
        <p>Da es auch außerhalb des Funkes viel benutzt wird, sollte man sich das NATO-Alphabet dringend aneignen.</p>
      </section>
    </section>

    <section id="Beendigung">
      <p>Hat man alles gesagt, muss man auch das dem Funkkreis signalisieren. Andere halten das Gespräch ansonsten für unbeendet und halten Funkstille. Hierzu gibt es eine Reihe von Signalwörtern:</p>

      <section>
        <h3>Kommen</h3>
        <p>Mit „kommen“ am Ende eines Funkspruches zeigt man an, dass man eine Antwort vom Gegenüber erwartet. Man benutzt es auch nach dem Beantworten einer Frage.</p>

        <h3>Ende</h3>
        <p>Mit „ende“ beendet man den Austausch. „Ende“ wird von der Partei gebraucht, die den Austausch begonnen hat.</p>

        <h3>Trennung</h3>
        <p>„Trennung“ ist effektiv ein „ende“. Es zeigt dem Funkkreis an, dass der Sprecher das Gespräch mit einer Partei für beendet erklärt, aber direkt zu einer Anderen Kontakt aufnehmen möchte. Es folgt auf „Trennung“ also direkt die Verbindung zum neuen Gesprächspartner.</p>
      </section>
    </section>

    <section id="Außnahmen und Notfälle">
      <p>Grundsätzlich herrscht während eines laufenden Austausches Funkstille für alle anderen. Kommt es jedoch zu Notfällen, kann es sein, dass ein Dritter sich mit Signalwörtern wie „eil“, „sofort“ oder „Blitz“ einschaltet. Dies bedeutet offensichtlich eine Notlage und das laufende Gespräch ist zu unterbrechen.</p>

      <p>Diese Anleitung vermittelt bloß die absoluten Grundlagen des Funkens. Je nach Spezialisierung sind noch weitere Dinge relevant, wie etwa beim Funken im Konvoi und zwischen der Logistik, im Funk unter Truppführern, Sanitätern oder Aufklärern. Dazu finden sich Einträge mit weiterführenden Informationen auf den jeweiligen Unterseiten.</p>
    </section>
  </svelte:fragment>
</Wiki>
