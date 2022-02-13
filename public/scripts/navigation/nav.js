import { onMount } from "svelte";

export function dropDown() {
  const expandable = document.getElementsByClassName("expandable");
  const navList = document.getElementById("nav-list");
  var expandableArr = Array.from(expandable);

  let lastClicked = "";
  let toOpen = false;
  expandableArr.forEach((element) => {
    element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round noselect">expand_more</span>');

    element.onclick = function (event) {
      event.preventDefault();

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
