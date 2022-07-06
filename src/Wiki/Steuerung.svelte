<style>
  td,
  th {
    padding-bottom: 1rem;
    min-width: 29rem;
  }

  .switch-button {
    background: rgb(228, 228, 228);
    border-radius: 5rem;
    overflow: hidden;
    width: 25rem;
    text-align: center;
    font-size: 14pt;
    color: var(--brandPrimaryTXT);
    position: relative;
    padding-right: 12.5rem;
    position: relative;
    margin-bottom: 2rem;
  }
  .switch-button:before {
    content: "Mac";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 12.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }
  .switch-button-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
  }
  .switch-button-checkbox:checked + .switch-button-label:before {
    transform: translateX(12.5rem);
    transition: transform 300ms linear;
  }
  .switch-button-checkbox + .switch-button-label {
    position: relative;
    padding: 1rem 0;
    display: block;
    user-select: none;
    pointer-events: none;
  }
  .switch-button-checkbox + .switch-button-label:before {
    content: "";
    background: #bdbdbd;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5rem;
    transform: translateX(0);
    transition: transform 300ms;
  }
  .switch-button-checkbox + .switch-button-label .switch-button-label-span {
    position: relative;
  }

  section#Erklärung {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 700px) {
    td,
    th {
      padding-bottom: 1rem;
      min-width: 20rem;
    }
  }
</style>

<script lang="ts">
  import Wiki from "../Wiki.svelte";
  import { exampleBox, tooltip } from "../wikitools";
  let currentLayout = "win";
  function kbdToggle() {
    let kbd = document.querySelectorAll("kbd");

    if (currentLayout === "win") {
      kbd.forEach((element) => {
        element.innerHTML = element.innerHTML.replace("WIN", "CMD");
        element.innerHTML = element.innerHTML.replace("ALT", "OPTN");
        element.innerHTML = element.innerHTML.replace("LCTRL", "CTRL");
      });
      currentLayout = "mac";
    } else {
      kbd.forEach((element) => {
        element.innerHTML = element.innerHTML.replace("CMD", "WIN");
        element.innerHTML = element.innerHTML.replace("OPTN", "ALT");
        element.innerHTML = element.innerHTML.replace("CTRL", "LCTRL");
      });
      currentLayout = "win";
    }
  }
</script>

<Wiki>
  <svelte:fragment slot="content">
    <article id="steuerung" />
    <h1>Steuerung</h1>
    <section id="Erklärung">
      <p>Hier findet ihr die Standard Steuerung für ArmA 3. Je nach Benutzereinstellungen kann sie allerdings variieren.<br />Spieler mit Mac-Tastaturen können unten das Layout wechseln.</p>
    </section>

    <div class="switch-button" on:click={kbdToggle}>
      <input class="switch-button-checkbox" type="checkbox" />
      <label class="switch-button-label" for=""><span class="switch-button-label-span">Windows</span></label>
    </div>

    <!-- Bitte WINDOWS Tasten als Default verwenden. Auch auf deutsche Schreibweise achen: LCTRL statt CTRL! -->
    <section id="Allgemein">
      <table>
        <tr>
          <th>Aktion</th>
          <th>Tastenbelegung</th>
        </tr>
        <tr>
          <td>Spiel pausieren</td>
          <td><kbd>ESC</kbd></td>
        </tr>
        <tr>
          <td>Umschauen (halten)</td>
          <td><kbd>LALT</kbd></td>
        </tr>
        <tr>
          <td>Umschauen (feststellen)</td>
          <td>2x <kbd>LALT</kbd></td>
        </tr>
        <tr>
          <td>Inventar</td>
          <td><kbd>I</kbd></td>
        </tr>
        <tr>
          <td>Karte</td>
          <td><kbd>M</kbd></td>
        </tr>
        <tr>
          <td>Kompass</td>
          <td><kbd>K</kbd></td>
        </tr>
        <tr>
          <td>Armbanduhr</td>
          <td><kbd>O</kbd></td>
        </tr>
        <tr>
          <td>Fernglas</td>
          <td><kbd>B</kbd></td>
        </tr>
        <tr>
          <td><span use:tooltip data-tooltip="Zusäzliches Fenster auf der rechten Seite des Bildschirms, z.B. GPS, Minendetektor">Right Panel Next</span></td>
          <td><kbd>+</kbd></td>
        </tr>
        <tr>
          <td><span use:tooltip data-tooltip="Zusäzliches Fenster auf der linken Seite des Bildschirms, z.B. GPS, Minendetektor">Left Panel Next</span></td>
          <td><kbd>Ü</kbd></td>
        </tr>
        <tr>
          <td>Interagieren (Vanilla)</td>
          <td><kbd>SPACE</kbd></td>
        </tr>
        <tr>
          <td>Fremdinteraktion (Ace)</td>
          <td><kbd>LWIN</kbd></td>
        </tr>
        <tr>
          <td>Eigeninteraktion (Ace)</td>
          <td><kbd>LLCTRL</kbd> + <kbd>LWIN</kbd></td>
        </tr>
        <tr>
          <td>Prim. Funkgerät</td>
          <td><kbd>CAPS</kbd></td>
        </tr>
        <tr>
          <td>Sekund. Funkgerät</td>
          <td><kbd>CTRL</kbd> + <kbd>CAPS</kbd></td>
        </tr>
        <tr>
          <td>Redereichweite</td>
          <td><kbd>TAB</kbd> + <kbd>SCROLL</kbd></td>
        </tr>
        <tr>
          <td>Medizinische Übersicht</td>
          <td><kbd>H</kbd></td>
        </tr>
        <tr>
          <td>Nachtsichtgerät</td>
          <td><kbd>N</kbd></td>
        </tr>
      </table>
    </section>
    <section id="Zu Fuß">
      <table>
        <tr>
          <th>Aktion</th>
          <th>Tastenbelegung</th>
        </tr>
        <tr>
          <td>Bewegen</td>
          <td><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></td>
        </tr>
        <tr>
          <td>Lehnen</td>
          <td><kbd>Q</kbd><kbd>E</kbd></td>
        </tr>
        <tr>
          <td>Hocken</td>
          <td><kbd>X</kbd></td>
        </tr>
        <tr>
          <td>Hinlegen</td>
          <td><kbd>Y</kbd></td>
        </tr>
        <tr>
          <td>Sprinten</td>
          <td><kbd>LSHIFT</kbd></td>
        </tr>
        <tr>
          <td>Umschauen</td>
          <td><kbd>LALT</kbd></td>
        </tr>
        <tr>
          <td>Klettern</td>
          <td><kbd use:tooltip data-tooltip="Muss festgelegt werden!">User Action Key 1</kbd></td>
        </tr>
        <tr>
          <td>Salutieren</td>
          <td><kbd>#</kbd></td>
        </tr>
        <tr>
          <td>Hinsetzen</td>
          <td><kbd>ä</kbd></td>
        </tr>
      </table>
    </section>
    <section id="Waffen">
      <table>
        <tr>
          <th>Aktion</th>
          <th>Tastenbelegung</th>
        </tr>
        <tr>
          <td>Schießen</td>
          <td><kbd>LMB</kbd></td>
        </tr>
        <tr>
          <td>Visier nutzen</td>
          <td><kbd>RMB</kbd></td>
        </tr>
        <tr>
          <td>Visierung wechseln</td>
          <td><kbd>LCTRL</kbd> + <kbd>RMB</kbd></td>
        </tr>
        <tr>
          <td>Nachladen</td>
          <td><kbd>R</kbd></td>
        </tr>
        <tr>
          <td>Feuermodus wechseln</td>
          <td><kbd>F</kbd></td>
        </tr>
        <tr>
          <td>Waffe sichern</td>
          <td><kbd>CTRL</kbd> + <kbd>^</kbd></td>
        </tr>
        <tr>
          <td>Magazin prüfen</td>
          <td><kbd>CTRL</kbd> + <kbd>R</kbd></td>
        </tr>
        <tr>
          <td>Waffe senken</td>
          <td>2x <kbd>CTRL</kbd></td>
        </tr>
        <tr>
          <td>High Ready</td>
          <td><kbd>T</kbd></td>
        </tr>
        <tr>
          <td>Low Ready</td>
          <td><kbd>LSHIFT</kbd> + <kbd>T</kbd></td>
        </tr>
        <tr>
          <td>Primärwaffe wechseln</td>
          <td><kbd>1</kbd></td>
        </tr>
        <tr>
          <td>Sekundärwaffe wechseln</td>
          <td><kbd>2</kbd></td>
        </tr>
        <tr>
          <td>Raketenwerfer wechseln</td>
          <td><kbd>3</kbd></td>
        </tr>
        <tr>
          <td>Waffe auflegen</td>
          <td><kbd>C</kbd></td>
        </tr>
        <tr>
          <td>Waffe holstern</td>
          <td><kbd>0</kbd></td>
        </tr>
        <tr>
          <td>Lampe/Laser</td>
          <td><kbd>L</kbd></td>
        </tr>
        <tr>
          <td>Lampe/Laser wechseln</td>
          <td><kbd>LCTRL</kbd> + <kbd>L</kbd></td>
        </tr>
      </table>
    </section>
    <section id="Fahrzeuge">
      <table>
        <tr>
          <th>Aktion</th>
          <th>Tastenbelegung</th>
        </tr>
        <tr>
          <td>Fahren</td>
          <td><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></td>
        </tr>
        <tr>
          <td>Motor an</td>
          <td><kbd>2</kbd></td>
        </tr>
        <tr>
          <td>Motor aus</td>
          <td><kbd>1</kbd></td>
        </tr>
        <tr>
          <td>Schneller fahren</td>
          <td><kbd>LSHIFT</kbd></td>
        </tr>
        <tr>
          <td>Langsamer fahren</td>
          <td><kbd>LCTRL</kbd></td>
        </tr>
        <tr>
          <td>Handbremse</td>
          <td><kbd>X</kbd></td>
        </tr>
        <tr>
          <td>Scheinwerfer</td>
          <td><kbd>L</kbd></td>
        </tr>
        <tr>
          <td>Aussteigen (Motor aus)</td>
          <td><kbd>V</kbd></td>
        </tr>
        <tr>
          <td>Aussteigen (Motor an lassen)</td>
          <td>2x <kbd>V</kbd></td>
        </tr>
        <tr>
          <td>Sitz höher</td>
          <td><kbd>CTRL</kbd> + <kbd>PgUp</kbd></td>
        </tr>
        <tr>
          <td>Sitz tiefer</td>
          <td><kbd>CTRL</kbd> + <kbd>PgDn</kbd></td>
        </tr>
      </table>
    </section>
  </svelte:fragment>
  <svelte:fragment slot="editdate">07.07.2022</svelte:fragment>
</Wiki>
