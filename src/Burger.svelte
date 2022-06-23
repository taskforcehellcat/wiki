<script context="module">
  var isOpen = false;

  export function toggleBurgerIcon() {
    if (!window.matchMedia("(max-width: 800px)").matches) {
      menuOpen.style.display = "none";
      menuClose.style.display = "none";
      main.style.display = "block";
      overlay.style.display = "none";
      burgerMenu.style.display = "none";
      isOpen = false;
    } else if (isOpen == false) {
      menuOpen.style.display = "block";
      burgerMenu.style.display = "inline-block";
    }
  }

  export function toggleBurgerMenu() {
    isOpen = !isOpen;
    if (window.matchMedia("(max-width: 800px)").matches) {
      if (isOpen == false) {
        menuOpen.style.display = "block";
        menuClose.style.display = "none";
        overlay.style.display = "none";
      } else {
        overlay.style.display = "flex";
        menuOpen.style.display = "none";
        menuClose.style.display = "block";
      }
    }
  }

  export function hideBurgerMenu() {
    menuOpen.style.display = "block";
    menuClose.style.display = "none";
    overlay.style.display = "none";
  }
</script>
