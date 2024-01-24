import { carouselHandler } from "./utils/carouselHandler.js";
import { changeHeaderBg } from "./utils/headerBgOnscroll.js";
import { collapseHandler } from "./utils/collapseHandler.js";
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
const questionWrapper = document.querySelectorAll(".collapse-item-question");

questionWrapper.forEach((question) => {
  question.addEventListener("click", () => {
    const { item } = question.dataset;
    collapseHandler(item);
  });
});
