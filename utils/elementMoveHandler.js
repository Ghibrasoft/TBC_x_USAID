import { windowWidth } from "./windowWidth.js";

function moveElement(element, source, destination) {
  if (source.contains(element)) {
    source.removeChild(element);
    destination.appendChild(element);
  }
}

function moveElements() {
  if (windowWidth <= 768) {
    const buttonElement = document.querySelector(
      ".footer-container-content-bottom-actions button"
    );
    const targetDiv = document.querySelector(
      ".footer-container-content-top-right"
    );

    if (buttonElement && targetDiv) {
      const socmediaDiv = targetDiv.querySelector(
        ".footer-container-content-top-right-socmedia"
      );

      if (socmediaDiv) {
        targetDiv.insertBefore(buttonElement, socmediaDiv);
      } else {
        targetDiv.appendChild(buttonElement);
      }
    }

    const copyrightDiv = document.querySelector(
      ".footer-container-content-copyright"
    );
    const bottomDiv = document.querySelector(
      ".footer-container-content-bottom"
    );

    const bothParentElement = copyrightDiv.parentElement;
    // swap the positions
    bothParentElement.insertBefore(bottomDiv, copyrightDiv);
  }
}

export { moveElement, moveElements };
