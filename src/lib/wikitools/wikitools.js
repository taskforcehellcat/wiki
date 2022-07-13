export function tooltip(element) {
  let div;
  let tooltip;
  let tooltipimg;

  function mouseOver(event) {
    // NOTE: remove the `tooltip` attribute, to prevent showing the default browser tooltip
    // remember to set it back on `mouseleave`
    tooltip = element.getAttribute("data-tooltip");
    tooltipimg = element.getAttribute("data-tooltip-img");
    //if element has attribute data-tooltip

    if (tooltip) {
      element.removeAttribute("data-tooltip");
      div = document.createElement("div");
      div.innerHTML = tooltip;
      div.className = "tooltip";
      document.body.appendChild(div);
    } else if (tooltipimg) {
      div = document.createElement("div");
      div.textContent = tooltip;
      div.innerHTML = "<img style='max-width: 100%;' src='" + tooltipimg + "'>";
      div.className = "tooltip";
      div.style.width = "80vw";
      div.style.overflowX = "hidden";
      document.body.appendChild(div);
    }
  }

  function mouseMove(event) {
    if (tooltipimg) {
      if (!window.matchMedia("(max-width: 800px)").matches) {
        div.style.left = `${event.pageX + 5}px`;
        div.style.top = `${event.pageY + 5}px`;
      } else {
        div.style.position = "absolute";
        div.style.left = "50%";
        div.style.transform = "translateX(-50%)";
        div.style.top = `${event.pageY + 5}px`;
      }
    } else if (tooltip) {
      div.style.left = `${event.pageX + 5}px`;
      div.style.top = `${event.pageY + 5}px`;
    }
  }

  function mouseLeave() {
    document.body.removeChild(div);
    // NOTE: restore the `tooltip` attribute

    if (tooltip) {
      element.setAttribute("data-tooltip", tooltip);
    } else if (tooltipimg) {
      element.setAttribute("data-tooltip-img", tooltipimg);
    }
  }

  window.onresize = mouseLeave;

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mouseleave", mouseLeave);
  element.addEventListener("mousemove", mouseMove);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mouseleave", mouseLeave);
      element.removeEventListener("mousemove", mouseMove);
    },
  };
}

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
  function toggleExampleBox() {
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
  }
  topDiv.addEventListener("click", toggleExampleBox);
}
