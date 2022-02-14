<script context="module">
  var isOpen = false;

  export function showBurgerIcon() {
    if (!window.matchMedia("(max-width: 800px)").matches) {
      menuOpen.style.display = "none";
      menuClose.style.display = "none";
      main.style.display = "block";
      overlay.style.display = "none";
      isOpen = false;
    } else if (isOpen == false) {
      menuOpen.style.display = "block";
    }
  }

  export function showBurgerMenu() {
    isOpen = !isOpen;

    if (window.matchMedia("(max-width: 800px)").matches) {
      if (isOpen == false) {
        menuOpen.style.display = "block";
        menuClose.style.display = "none";
        main.style.display = "block";
        overlay.style.display = "none";
        document.body.style.overflowY = "auto";
        document.body.style.position = "unset";
      } else {
        main.style.display = "none";
        overlay.style.display = "flex";
        menuOpen.style.display = "none";
        menuClose.style.display = "block";
        document.body.style.overflowY = "scroll";
        document.body.style.position = "fixed";
      }
    }
  }
</script>
