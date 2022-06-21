export function tooltip(element) {
  let div;
  let tooltip;

  function mouseOver(event) {
    // NOTE: remove the `tooltip` attribute, to prevent showing the default browser tooltip
    // remember to set it back on `mouseleave`
    tooltip = element.getAttribute("data-tooltip");
    element.removeAttribute("data-tooltip");

    div = document.createElement("div");
    div.textContent = tooltip;
    div.style = `
        color: #061748;
        border: 1px solid #686868;
        box-shadow: 1px 1px 1px #ddd;
        background: white;
        border-radius: 4px;
        padding: 4px;
        position: absolute;
        max-width: 50rem;
        text-align: justify;
        top: ${event.pageX + 5}px;
        left: ${event.pageY + 5}px;
      `;
    document.body.appendChild(div);
  }

  function mouseMove(event) {
    div.style.left = `${event.pageX + 5}px`;
    div.style.top = `${event.pageY + 5}px`;
  }

  function mouseLeave() {
    document.body.removeChild(div);
    // NOTE: restore the `tooltip` attribute
    element.setAttribute("data-tooltip", tooltip);
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
