function fetchAndRenderCards() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("./db/cards-data.json")
      .then((res) => res.json())
      .then((cardsData) => {
        const gridContainer = document.getElementById("grid-cards");

        cardsData.forEach((article) => {
          const card = createCardElement(article);
          gridContainer.appendChild(card);
        });
      })
      .catch((error) => console.error(error));
  });
}

function createCardElement(article) {
  const card = document.createElement("article");
  const cardCover = document.createElement("img");
  const cardContentWrapper = document.createElement("div");
  const cardActionWrapper = document.createElement("div");
  const cardTitleWrapper = document.createElement("div");
  const cardAction = document.createElement("a");
  const arrowIcon = document.createElement("img");

  card.className = "second-section-grid-container-card";
  cardContentWrapper.className = "second-section-grid-container-card-content";
  cardCover.className = "second-section-grid-container-card-cover";
  cardActionWrapper.className =
    "second-section-grid-container-card-action-wrapper";
  cardTitleWrapper.className =
    "second-section-grid-container-card-title-wrapper";
  cardAction.className = "second-section-grid-container-card-action";

  cardCover.alt = "card-cover";
  cardCover.src = article.image;
  card.appendChild(cardCover);

  // wrap cardTitleWrapper and cardActionWrapper in cardContentWrapper
  cardContentWrapper.appendChild(cardTitleWrapper);
  cardContentWrapper.appendChild(cardActionWrapper);

  cardTitleWrapper.innerHTML += `
        <h1>${article.title}</h1>
        <p>${article.description}</p>
      `;

  card.appendChild(cardContentWrapper);

  arrowIcon.src = "./assets/icons/arrow-right.svg";
  card.appendChild(arrowIcon);

  cardAction.href = "#";
  cardAction.textContent = "კურსის დეტალები";
  cardActionWrapper.appendChild(arrowIcon);
  cardActionWrapper.appendChild(cardAction);

  return card;
}

export { fetchAndRenderCards };
