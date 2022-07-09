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

<script lang="ts">


  let themeButton;
  let themePicker;
  let themesOpen = false;
  
  let theme = localStorage.getItem("USERTHEME");
  let useSysTheme = false;

  if (theme === null) {
    themePickerUsed("auto");
  }
  
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (useSysTheme) {
        theme = e.matches ? "dark" : "light";
        setColorScheme(theme);
      }
      
    });

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

  function setColorScheme(setheme) {
    let rootStyle = document.documentElement.style;

    if (setheme === "light") {

      rootStyle.setProperty("--brandPrimaryBG", "#101b3b");
      rootStyle.setProperty("--brandSecondaryBG", "#273252");
      rootStyle.setProperty("--brandTertiaryBG", "#11182e");
      rootStyle.setProperty("--brandPrimaryTXT", "#101b3b");
      rootStyle.setProperty("--brandSecondaryTXT", "#94a2cf");
      rootStyle.setProperty("--brandNeutral", "#fff");
      rootStyle.setProperty("--navHover", "#fff");
      rootStyle.setProperty("--wikiBG", "#fff");
      rootStyle.setProperty("--kbdBG", "#212529");
      rootStyle.setProperty("--exampleBoxBG", "#e7e9eb");
      rootStyle.setProperty("--exampleBoxBorder", "#646464");
      rootStyle.setProperty("--hyperLink", "#436adf");
      rootStyle.setProperty("--errorTXT", "#c1a03e");      

    } else if (setheme === "dark") {

      rootStyle.setProperty("--brandPrimaryBG", "#0a0a0a");
      rootStyle.setProperty("--brandSecondaryBG", "#1b1b1b");
      rootStyle.setProperty("--brandTertiaryBG", "#050505");
      rootStyle.setProperty("--brandPrimaryTXT", "#fff");
      rootStyle.setProperty("--brandSecondaryTXT", "#767676");
      rootStyle.setProperty("--brandNeutral", "#fff");
      rootStyle.setProperty("--navHover", "#fff");
      rootStyle.setProperty("--wikiBG", "url('./images/background.jpg')");
      rootStyle.setProperty("--kbdBG", "#212529");
      rootStyle.setProperty("--exampleBoxBG", "#0f0f0f");
      rootStyle.setProperty("--exampleBoxBorder", "#646464");
      rootStyle.setProperty("--hyperLink", "red");
      rootStyle.setProperty("--errorTXT", "#9d884a");

    } 
  }

  function themePickerUsed(whichOne: string) {

    if (whichOne === "auto") {
      useSysTheme = true;
      localStorage.removeItem("USERTHEME");
      theme = (window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
      setColorScheme(theme);
    } else {
      useSysTheme = false;
      localStorage.setItem("USERTHEME", whichOne);
      setColorScheme(whichOne);
    }

  }

  setColorScheme(theme);
</script>

<div id="theme">
  <button id="theme__button" on:click={toggleThemeMenu} bind:this={themeButton}><span class="material-icons">format_paint</span></button>
  <div id="theme__picker" bind:this={themePicker}>
    <input type="radio" id="theme_light" name="theme" value={"light"} bind:group={theme} on:click={() => themePickerUsed("light")} />
    <label for="theme_light" />
    <input type="radio" id="theme_dark" name="theme" value={"dark"} bind:group={theme} on:click={() => themePickerUsed("dark")} />
    <label for="theme_dark" />
    <input type="radio" id="theme_auto" name="theme" value={"auto"} bind:group={theme} on:click={() => themePickerUsed("auto")} />
    <label for="theme_auto" />
  </div>
</div>
