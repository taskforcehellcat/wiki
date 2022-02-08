<style>
  #wiki-wrapper {
    min-height: 120vh;
    display: grid;
    grid-template-columns: 38rem 4fr;
    grid-template-rows: 10fr 1fr;
  }
  #nav-list-bar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  #return-button {
    height: 2rem;
    width: 100%;
    justify-self: end;
  }

  #nav-logo {
    font-size: 28pt;
    font-weight: 300;
    color: #fff;
    font-family: "purista-web", "Segoe UI", sans-serif;
  }

  #nav-logo > span {
    font-weight: 700;
  }

  input {
    background-color: none;
    background: none;
    border: none;
  }

  #nav-search {
    background-color: #273252;
    width: 100%;
    height: 5.5rem;
    border-radius: 0.7rem;
    -webkit-border-radius: 0.7rem;
    -moz-border-radius: 0.7rem;
    -ms-border-radius: 0.7rem;
    -o-border-radius: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  #nav-search {
    padding: 5%;
  }

  #nav-search input {
    width: 100%;
    height: 24px;
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
  }

  .nav-list-title {
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin-bottom: -2rem;
  }

  #nav-search .material-icons {
    font-size: 20pt;
    color: #94a2cf;
  }

  input::placeholder {
    color: #94a2cf;
    font-weight: 300;
  }

  input:focus,
  input:focus {
    outline: none;
  }

  #nav-list-wrapper {
    display: flex;
    gap: 15px;
    height: fit-content;
    box-sizing: unset;
  }

  #nav-list-bar {
    width: 3px;
    background-color: #2d3653;
    height: 100%;
    border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
    -ms-border-radius: 0.2rem;
    -o-border-radius: 0.2rem;
  }

  #nav-list-bar-thumb {
    width: 100%;
    background-color: #94a2cf;
  }

  #nav-list {
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.8rem 0 0.8rem 0;
  }

  nav {
    height: 100vh;
    background-color: #101b3b;
    display: flex;
    color: #fff;
    flex-direction: column;
    padding: 10%;
    gap: 3rem;
    color: #94a2cf;
    position: sticky;
    z-index: 99;
    top: 0;
    overflow-y: scroll;
  }

  nav::-webkit-scrollbar {
    display: none;
  }

  /* Temporary Media Query */
  @media only screen and (max-width: 800px) {
    nav {
      display: none;
    }

    #wiki-wrapper {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  import { onMount } from "svelte";
  onMount(async () => {
    const thumb = document.getElementById("nav-list-bar-thumb");
    const sections = document.querySelectorAll("section");
    const navList = document.getElementById("nav-list");
    const bar = document.getElementById("nav-list-bar");
    var sectionsArr = Array.from(sections);
    var x = 1;

    /* Konvertiert "Sections" NodeList zu Array (falls man's mal brauch x) */
    // for(var i = sections.length; i--; sectionsArr.unshift(sections[i]));

    /* Fügt h2 zu allen elementen der NodeList */
    sectionsArr.forEach((element) => {
      element.insertAdjacentHTML("afterBegin", "<h2>" + element.id + "</h2>");
      navList.innerHTML +=
        '<a href="#' + element.id + '">' + element.id + "</a>";
    });

    /* setzt nav-list-bar-thumb auf genaue höhe von einem navi punkt */
    var thumbPercent = (1 / sections.length) * 100;
    if (
      parseInt(bar.style.paddingTop) - parseInt(thumb.style.height) <=
      parseInt(window.getComputedStyle(bar).getPropertyValue("height"))
    ) {
      thumb.style.height =
        parseInt(
          parseInt(window.getComputedStyle(bar).getPropertyValue("height"))
        ) *
          (thumbPercent / 100) +
        "px";
    } else;

    //	thumb.style.height = 1 / sections.length * 100 + "%";

    window.addEventListener("scroll", (event) => {
      bar.style.paddingTop = window.scrollY / (sections.length * 10) + "rem";
    });

    var sectionHeight = 0;
    sections.forEach((element) => {
      sectionHeight += parseInt(window.getComputedStyle(element).height);
    });

    console.log(sectionHeight);

    document.getElementById("wiki-wrapper").minHeight = sectionHeight;
  });
</script>

<div id="wiki-wrapper">
  <nav>
    <div id="nav-logo">TFHC <span>Wiki</span></div>
    <div id="nav-search">
      <span class="material-icons">search</span>
      <input type="text" name="search" placeholder="Wiki durchsuchen..." />
    </div>

    <div class="nav-list-title">navigation</div>
    <div id="nav-list-wrapper">
      <div id="nav-list-bar">
        <div id="nav-list-bar-thumb" />
      </div>
      <div id="nav-list" />
    </div>
    <div class="nav-list-title">wiki</div>
    <a href="/" id="return-button"> Return </a>
  </nav>

  <main>
    <slot name="content" />
  </main>
  <footer />
</div>
