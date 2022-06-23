export function exampleBox(element) {
  let div;
  let tooltip;

  div = document.createElement("div");
  div.className = "exampleBox";
  let topDiv = div.appendChild(document.createElement("div"));
  topDiv.innerHTML = `<span class="noselect">Beispiel:</span><span class="material-icons noselect">add</span>`;
  let bottomDiv = div.appendChild(document.createElement("div"));
  bottomDiv.innerHTML = element.innerHTML;
  element.innerHTML = null;
  element.insertBefore(div, element.firstChild);
  bottomDiv.style.display = "none";
  topDiv.style.borderBottomLeftRadius = "0.5rem";
  topDiv.style.borderBottomRightRadius = "0.5rem";

  let exampleBoxOpen = false;
  topDiv.addEventListener("click", function () {
    if (exampleBoxOpen) {
      bottomDiv.style.display = "none";
      topDiv.style.borderBottomLeftRadius = "0.5rem";
      topDiv.style.borderBottomRightRadius = "0.5rem";
      topDiv.innerHTML = `<span class="noselect">Beispiel:</span><span class="material-icons noselect">add</span>`;
      exampleBoxOpen = false;
    } else {
      bottomDiv.style.display = "block";
      topDiv.style.borderBottomLeftRadius = "0";
      topDiv.style.borderBottomRightRadius = "0";
      topDiv.innerHTML = `<span class="noselect">Beispiel:</span><span class="material-icons noselect">remove</span>`;
      exampleBoxOpen = true;
    }
  });
}
