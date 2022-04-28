<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import Abteilungsleiter from "./Abteilungsleiter.svelte";
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="allgemeines" />
    <h1>Allgemeines</h1>

    <section id="Über uns">
      <p>Die Task Force Hellcat spielt ausschließlich MilSim in der von Bohemia Interactive entwickelten Militärsimulation Arma 3. Um das Spielgeschehen möglichst taktisch und immersiv zu gestalten spielen wir primär selbstgeschriebene Missionen in (regelmäßigen) Events und führen diverse Ausbildungen durch, sodass jeder Mitspieler seine präferierte Rolle möglichst effektiv ausspielen kann. Das verwendete Equipment stammt ausschließlich aus der westlichen Welt und wird gelegentlich nach dem Abschluss einer Kampagne gewechselt.</p>
    </section>

    <section id="Struktur">
      <p>In unserer Einheit gibt es eine klare Struktur in Abteilungen, die verschiedene Truppengattungen in sich vereinen. Die Abteilungsleiter kümmern sich in erster Linie um alles Organisatorische innerhalb ihrer Abteilung. Zusätzlich sind sie der Oberbefehlshaber aller Truppengattungen ihrer Abteilung, wodurch sie sich aktiv bei der Operationsplanung beteiligen.</p>

      <object title="Task Force Hellcat Struktur" data="./images/tfhc_struktur.svg" />
    </section>

    <section id="Voraussetzungen und Beitritt">
      <p>Voraussetzungen für den Beitritt sind das Spiel Arma 3, ein Mikrofon und TeamSpeak sowie Discord für Organisatorisches. Sind diese Voraussetzungen erfüllt treffen sich Bewerber mit unserem Personal in einem persönlichen Gespräch, um vorab die Interessen des Bewerbers zu besprechen und gegebenenfalls Fragen zu beantworten. Jede Person die willig ist im Rahmen unseres Regelwerkes MilSim zu spielen, ist herzlich willkommen. Nach einem positiven Verlauf des persönlichen Gespräches durchläuft der Bewerber eine Grundausbildung mit einem ihm zugewiesenen Mentor, der ihm alle wichtigen Kenntnisse für unser MilSim vermittelt. Nach erfolgreichem Abschluss der Grundausbildung und der Vertiefung des Erlernten durch Übungen wird der Bewerber zu einem offiziellen Mitglied der Task Force Hellcat und kann an unseren Events mit grundlegenden Rollen der Infanterie teilnehmen.</p>
    </section>

    <section id="Organisation">
      <p>Die Organisation unserer Einheit findet ausschließlich auf unserem <a href="https://discord.gg/Ap3bEmBgXw" target="_blank">Discord</a> statt. Nachdem unser Regelwerk gelesen und akzeptiert wurde, freuen wir uns über einen Beitritt zu unserem Discord Server.</p>
    </section>
  </svelte:fragment>
</Wiki>
