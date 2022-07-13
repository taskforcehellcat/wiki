//import { onMount } from "svelte";

export function includeDropDown() {
  const expandable = document.getElementsByClassName("expandable");
  var expandableArr = Array.from(expandable);

  let lastClicked = "";
  let toOpen = false;
  expandableArr.forEach((element) => {
    element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round noselect">expand_more</span>');

    element.onclick = function (event) {
      toOpen = event.target.firstChild.textContent == lastClicked && !toOpen;
      lastClicked = event.target.firstChild.textContent;

      expandableArr.forEach((element) => {
        element.classList.remove("open");
      });

      if (!toOpen) {
        element.classList.add("open");
      }
    };
  });
}
