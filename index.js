import { carouselHandler } from "./utils/carouselHandler.js";
import { changeHeaderBg } from "./utils/headerBgOnscroll.js";
import { menuSidebarHandler } from "./utils/burgerMenuSidebar.js";
import { windowWidth, updateWindowWidth } from "./utils/windowWidth.js";
import { fetchAndRenderCards } from "./utils/learningCoursesHandler..js";
import { moveElement, moveElements } from "./utils/elementMoveHandler.js";

// ---------- GET WINDOW WIDTH ---------- //
updateWindowWidth();
window.addEventListener("resize", updateWindowWidth);

// ---------- CHANGE HEADER BG ONSCROLL ---------- //
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

// ---------- BURGER MENU, SIDEBAR ---------- //
menuSidebarHandler();

// ---------- LEARNING COURSES ---------- //
fetchAndRenderCards();

// ---------- CAROUSEL ---------- //
carouselHandler();

// ---------- MOVE ANCHOR TAG ---------- //
const collapseContainer = document.querySelector(".collapse-container");
const titleWrapper = document.querySelector(
  ".third-section-container-content-bottom-inner-title-wrapper"
);
const allQuestionsLink = document.getElementById("all-questions");

if (windowWidth <= 768) {
  moveElement(allQuestionsLink, titleWrapper, collapseContainer);
} else {
  moveElement(allQuestionsLink, collapseContainer, titleWrapper);
}

// ----------  MOVE ELEMENTS (FOOTER)---------- //
window.addEventListener("resize", moveElements);
moveElements();

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
