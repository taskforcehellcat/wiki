<style>
  #theme {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 10;
  }
  #theme__button {
    width: 6rem;
    height: 6rem;
    border: none;
    cursor: pointer;
    border-top-right-radius: 1.5rem;
    border-top-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
  }

  #theme__picker {
    width: 6rem;
    height: fit-content;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    background-color: gray;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    display: none;
    padding-block: 2rem;
  }

  #theme__picker input {
    display: none;
  }

  #theme__picker label {
    width: 4.5rem;
    height: 4.5rem;
    background: #101b3b;
    border-radius: 50%;
  }

  #theme__picker label[for="theme_light"] {
    background: linear-gradient(-45deg, #fff 50%, #101b3b 5%);
  }

  #theme__picker label[for="theme_dark"] {
    background: linear-gradient(-45deg, #0a0a0a 50%, #1b1b1b 5%);
  }
</style>

<script>
  let themeButton;
  let themePicker;
  let themesOpen = false;

  function toggleThemeMenu() {
    if (themesOpen) {
      themesOpen = false;
      themePicker.style.display = "none";
      themeButton.style.borderBottomRightRadius = "1.5rem";
      themeButton.style.borderBottomLeftRadius = "1.5rem";
    } else {
      themesOpen = true;
      themePicker.style.display = "flex";
      themeButton.style.borderBottomRightRadius = "0";
      themeButton.style.borderBottomLeftRadius = "0";
    }
  }
</script>

<div id="theme">
  <button id="theme__button" on:click={toggleThemeMenu} bind:this={themeButton}><span class="material-icons">format_paint</span></button>
  <div id="theme__picker" bind:this={themePicker}>
    <input type="radio" id="theme_light" name="theme" value="light" />
    <label for="theme_light" />
    <input type="radio" id="theme_dark" name="theme" value="dark" />
    <label for="theme_dark" />
  </div>
</div>
