<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import Abteilungsleiter from "./Abteilungsleiter.svelte";
  import { tooltip } from "../tooltip";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="allgemeines" />
    <h1>Allgemeines</h1>

    <section id="Über uns">
      <section>
        <h3>Beschreibung</h3>
          <p>Die Task Force Hellcat ist eine 2021 gegründete Community, die Milsim in der von Bohemia Interactive entwickelten Militärsimulation <a href="https://de.wikipedia.org/wiki/Arma_3" target="_blank">ArmA 3</a> spielt. Dabei wird ein besonderer Wert auf Strategie, Teamplay, Realismus und Immersion gesetzt. Fast jedes Wochenende findet entweder ein Event oder eine Übung statt. Gespielt wird in Kampagnen, die in aufeinanderfolgenden Events absolviert werden. Die Karte und die Nation werden vor Beginn einer Kampagne gewählt, wodurch sich die Spieler aktiv bei der Planung beteiligen können, um für Abwechslung und Vielfältigkeit der Kampagnen zu sorgen.</p>

        <h3>Organisation</h3>
          <p>Die Organisation unserer Einheit findet ausschließlich auf unserem <a href="https://discord.gg/Ap3bEmBgXw" target="_blank">Discord</a> statt. Nachdem unser Regelwerk gelesen und akzeptiert wurde, freuen wir uns über einen Beitritt zu unserem Discord Server. Dort erfolgen Eventankündigungen, Wahlen, Verabredungen zu Ausbildungen, Updates zum Modpack und vieles mehr. Auch Fragen bezüglich unserer Community, des Spiels oder Ähnlichem können dort gestellt werden.</p>
      </section>
    </section>

    <section id="Mitmachen">
      <section>
        <h3>Voraussetzungen</h3>
        <ul>
          <li>Ein Mindestalter von 16 Jahren</li>
          <li>ArmA 3 samt Apex DLC</li>
          <li>Ein geeigneter Computer mit genügend Festplattenspeicher</li>
          <li>Ein Discord-Account mit verifizierter E-Mail</li>
          <li>TeamSpeak 3 und ein Headset beziehungsweise Mikrofon</li>
        </ul>

        <h3>Beitritt</h3>
          <p>Vor dem Beitritt in unsere Community durchläuft der Bewerber ein persönliches Gespräch mit unserem Personal. In diesem Gespräch sollen die Interessen und Vorstellungen des Bewerbers festgestellt werden. Dabei stellt unser Personal bis zum Ende des Gespräches fest, ob der Bewerber sich für unsere Community eignet.</p>

        <h3>Aufstieg</h3>
          <p>Jeder Bewerber beginnt als Rekrut. Diese Rolle gibt ihm die Möglichkeit unsere Community kennenzulernen und festzustellen, ob wir die richtige Community für ihn sind. Der Rekrut kann zum Kadett aufsteigen, indem er die Grundausbildung durchläuft, die ihm die Teilnahme an Kampagnen und Übungen sowie die Fortbildung zu <span use:tooltip data-tooltip="Grenadier, AT-Schütze, MG-Schütze, Präzisionsschütze, Funker">grundlegenden Rollen der Infanterie</span> ermöglicht. Ein Kadett kann zum Mitglied werden, indem er gutes Verhalten und Erfahrenheit aufweist. Mitglieder haben die Möglichkeit <span use:tooltip data-tooltip="Sanitäter, Scharfschütze, Helikopterpilot, JTAC, Richtschütze, ...">fortgeschrittene Aus- und Fortbildungen</span> aller Abteilungen zu durchlaufen.</p>
      </section>
    </section>

    <section id="Struktur">
      <p>In unserer Einheit gibt es eine klare Struktur in Abteilungen, die verschiedene Truppengattungen in sich vereinen. Jede Abteilung wird von einem eigenen Abteilungsleiter organisiert und verwaltet.</p>

      <img alt="Task Force Hellcat Struktur" src="./images/tfhc_struktur.svg" class="noselect" />
    </section>
  </svelte:fragment>
</Wiki>
