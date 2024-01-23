// ---------- GET WINDOW WIDTH ---------- //
var windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function updateWindowWidth() {
  windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
}
updateWindowWidth();
window.addEventListener("resize", updateWindowWidth);

// ---------- CHANGE HEADER BG ONSCROLL ---------- //
const header = document.getElementById("header");
let lastScrollPosition = 0;

function changeHeaderBg() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > lastScrollPosition) {
    // scrolling down
    if (window.innerWidth <= 768) {
      header.classList.add("hide-header");
    }
    header.classList.add("header-bg-secondary");
  } else {
    // scrolling up
    header.classList.remove("hide-header");
    if (scrollPosition === 0) {
      // at the top of the page
      header.classList.remove("header-bg-secondary");
    }
  }

  lastScrollPosition = scrollPosition;
}

window.addEventListener("scroll", changeHeaderBg);
window.addEventListener("resize", changeHeaderBg);

// ---------- ACTIVE NAVIGATION TABS ---------- //
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));

    navLink.classList.add("active");
  });
});

// ========== testing ========== //
const menu = document.getElementById("menu");
menu.onclick = () => {
  menu.classList.toggle("openmenu");
};
// ---------- BURGER MENU, SIDEBAR ---------- //
const burgerMenu = document.querySelector(".burger-menu-wrapper-inner");
const burgerMenuLines = document.querySelectorAll(
  ".burger-menu-wrapper-inner-lines-line"
);
const burgerTopLine = document.querySelector(".top-line");
const burgerBottomLine = document.querySelector(".bottom-line");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

burgerMenu.addEventListener("click", () => {
  toggleSidebar();
  toggleAnimationClasses();
  toggleMenuLineColors();
});

document.body.addEventListener("click", (e) => {
  if (
    !burgerMenu.contains(e.target) &&
    sidebarWrapper.classList.contains("show-sidebar")
  ) {
    toggleSidebar();
    toggleAnimationClasses();
    toggleMenuLineColors();
  }
});

function toggleSidebar() {
  const isOpen = sidebarWrapper.classList.toggle("show-sidebar");
  sidebarOverlay.classList.toggle("show-overlay", isOpen);
}

function toggleAnimationClasses() {
  burgerMenu.classList.toggle("burger-menu-rotate");
  burgerTopLine.classList.toggle("top-line-rotate");
  burgerBottomLine.classList.toggle("bottom-line-rotate");
}

function toggleMenuLineColors() {
  const isRotated = burgerMenu.classList.contains("burger-menu-rotate");
  const color = isRotated
    ? "var(--color-link-hover)"
    : "var(--color-text-base)";
  burgerMenuLines.forEach((line) => {
    line.style.backgroundColor = color;
  });
}

// ---------- LEARNING COURSES ---------- //
document.addEventListener("DOMContentLoaded", () => {
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
});

// ---------- CAROUSEL ---------- //
document.addEventListener("DOMContentLoaded", () => {
  fetch("./db/carousel-data.json")
    .then((response) => response.json())
    // create HTML elements and append to the slider
    .then((data) => {
      const slider = document.querySelector(".slider");
      // counter to keep track of the number of articles within the current cardContainer
      let articlesCounter = 0;

      data.forEach((partner) => {
        // check if the current cardContainer is full (3 articles) if true create new cardContainer for the first article
        if (articlesCounter === 0) {
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("cards-container");
          slider.appendChild(cardContainer);
        }

        // find the last cardContainer (the one just added)
        const cardContainers = document.querySelectorAll(".cards-container");
        const currentCardContainer = cardContainers[cardContainers.length - 1];

        // create article and img elements
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.alt = partner.alt;
        img.src = partner.src;

        // append img to article and article to the current cardContainer
        article.appendChild(img);
        currentCardContainer.appendChild(article);

        // increment the articles counter
        articlesCounter++;

        // if the current cardContainer is full, reset the counter
        if (articlesCounter === 3) {
          articlesCounter = 0;
        }
      });
    })
    // carousel functionality
    .then(() => {
      const carousel = document.querySelector(".carousel");
      const slider = document.querySelector(".slider");
      const leftArrow = document.querySelector(".left");
      const rightArrow = document.querySelector(".right");
      const dotParent = document.querySelector(".controls ul");
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

      const setIndexHandler = () => {
        resetStyles();
        document
          .querySelector(".controls .selected-dot")
          .classList.remove("selected-dot");
        slider.children[slideIndex].style.zIndex = 1;
        slider.children[slideIndex].style.opacity = 1;
      };

      document.querySelectorAll(".controls li").forEach((dot, index) => {
        dot.addEventListener("click", () => {
          slideIndex = index;
          setIndexHandler();
          dot.classList.add("selected-dot");
        });
      });

      // auto fading
      const startAnimating = () => {
        intervalId = setInterval(() => {
          resetStyles();
          document
            .querySelector(".controls .selected-dot")
            .classList.remove("selected-dot");
          slideIndex = slideIndex < slidesCount ? slideIndex + 1 : 0;
          dotParent.children[slideIndex].classList.add("selected-dot");
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
        setIndexHandler();
        dotParent.children[slideIndex].classList.add("selected-dot");
        slider.children[slideIndex].style.zIndex = 1;
        slider.children[slideIndex].style.opacity = 1;
      });
      // next
      rightArrow.addEventListener("click", () => {
        resetStyles();
        slideIndex = slideIndex < slidesCount ? slideIndex + 1 : slidesCount;
        setIndexHandler();
        dotParent.children[slideIndex].classList.add("selected-dot");
        slider.children[slideIndex].style.zIndex = 1;
        slider.children[slideIndex].style.opacity = 1;
      });
    })
    .catch((error) => console.error("Error fetching partners:", error));
});

// ---------- DYNAMIC ANCHOR TAG ---------- //
const collapseContainer = document.querySelector(".collapse-container");
const titleWrapper = document.querySelector(
  ".third-section-container-content-bottom-inner-title-wrapper"
);
const allQuestionsLink = document.getElementById("all-questions");

if (windowWidth < 768) {
  moveElement(allQuestionsLink, titleWrapper, collapseContainer);
} else {
  moveElement(allQuestionsLink, collapseContainer, titleWrapper);
}

function moveElement(element, source, destination) {
  if (source.contains(element)) {
    source.removeChild(element);
    destination.appendChild(element);
  }
}

// ---------- COLLAPSE FUNCTIONALITY ---------- //
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
