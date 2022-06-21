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
      div.textContent = tooltip;
      div.className = "tooltip";
      div.style = `
        top: ${event.pageX + 5}px;
        left: ${event.pageY + 5}px;
      `;
      document.body.appendChild(div);
    } else if (tooltipimg) {
      div = document.createElement("div");
      div.textContent = tooltip;
      div.innerHTML = "<img style='max-width: 45rem;' src='" + tooltipimg + "'>";
      div.className = "tooltip";
      div.style = `
        top: ${event.pageX + 5}px;
        left: ${event.pageY + 5}px;
      `;
      document.body.appendChild(div);
    }
  }

  function mouseMove(event) {
    div.style.left = `${event.pageX + 5}px`;
    div.style.top = `${event.pageY + 5}px`;
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
