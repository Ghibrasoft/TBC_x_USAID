// change header bg onScroll
const header = document.getElementById("header");
function changeHeaderBg() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    header.classList.add("header-bg-secondary");
  } else {
    header.classList.remove("header-bg-secondary");
  }
}
window.addEventListener("scroll", changeHeaderBg);

// active nav tabs
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));

    navLink.classList.add("active");
  });
});

// dynamically append learning courses
fetch("./db/cards-data.json")
  .then((res) => res.json())
  .then((cardsData) => {
    const gridContainer = document.getElementById("grid-cards");

    cardsData.forEach((article) => {
      const card = document.createElement("article");
      const cardCover = document.createElement("img");
      const cardContentWrapper = document.createElement("div");
      const cardActionWrapper = document.createElement("div");
      const cardTitleWrapper = document.createElement("div");
      const cardAction = document.createElement("a");
      const arrowIcon = document.createElement("img");

      card.className = "second-section-grid-container-card";
      cardContentWrapper.className =
        "second-section-grid-container-card-content";
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

      gridContainer.appendChild(card);
    });
  })
  .catch((error) => console.error(error));

// carousel
const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const slidesCount = slider.children.length - 1;
let slideIndex = 0;
let intervalId = 0;
const slideInterval = 3000;

const resetStyles = () => {
  for (let i = 0; i < slider.children.length; i++) {
    slider.children[i].style.zIndex = 0;
    slider.children[i].style.opacity = 0;
  }
};

// auto fading
const startAnimating = () => {
  intervalId = setInterval(() => {
    resetStyles();
    slideIndex = slideIndex < slidesCount ? slideIndex + 1 : 0;
    slider.children[slideIndex].style.zIndex = 1;
    slider.children[slideIndex].style.opacity = 1;
  }, slideInterval);
};
startAnimating();

carousel.addEventListener("mouseover", () => {
  clearInterval(intervalId);
});
carousel.addEventListener("mouseout", () => {
  startAnimating();
});

// prev
leftArrow.addEventListener("click", () => {
  resetStyles();
  slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
  slider.children[slideIndex].style.zIndex = 1;
  slider.children[slideIndex].style.opacity = 1;
});
// next
rightArrow.addEventListener("click", () => {
  resetStyles();
  slideIndex = slideIndex < slidesCount ? slideIndex + 1 : slidesCount;
  slider.children[slideIndex].style.zIndex = 1;
  slider.children[slideIndex].style.opacity = 1;
});

// collapse functionality
function collapseHandler(contentId) {
  const content = document.getElementById(contentId);
  const arrowDownIcon = content.previousElementSibling.querySelector("img");
  const allContentWrapper = document.querySelectorAll(
    ".collapse-content-wrapper"
  );

  allContentWrapper.forEach((currContent) => {
    if (currContent.id !== contentId) {
      currContent.style.maxHeight = null;
      const curArrowIcon =
        currContent.previousElementSibling.querySelector("img");
      if (curArrowIcon) {
        curArrowIcon.style.transform = "rotate(0deg)";
      }
    }
  });

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    arrowDownIcon.style.transform = "rotate(0deg)";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    arrowDownIcon.style.transform = "rotate(180deg)";
  }
}
