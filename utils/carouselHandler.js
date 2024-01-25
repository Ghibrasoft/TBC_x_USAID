import { windowWidth } from "./windowWidth.js";

function carouselHandler() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("./db/carousel-data.json")
      .then((response) => response.json())
      .then((data) => {
        const slider = document.querySelector(".slider");
        let articlesCounter = 0;

        data.forEach((partner) => {
          if (articlesCounter === 0) {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("cards-container");
            slider.appendChild(cardContainer);
          }

          const cardContainers = document.querySelectorAll(".cards-container");
          const currentCardContainer =
            cardContainers[cardContainers.length - 1];

          const article = document.createElement("article");
          const img = document.createElement("img");
          img.alt = partner.alt;
          img.src = partner.src;

          article.appendChild(img);
          currentCardContainer.appendChild(article);

          articlesCounter++;

          if (articlesCounter === 3) {
            articlesCounter = 0;
          }
        });
      })
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
          windowWidth > 768 && resetStyles();

          document
            .querySelector(".controls .selected-dot")
            .classList.toggle("selected-dot"); // rem

          if (windowWidth > 768) {
            slider.children[slideIndex].style.zIndex = 1;
            slider.children[slideIndex].style.opacity = 1;
          } else {
            slider.style.transform = "translate(" + slideIndex * -100 + "%)";
          }
        };

        document.querySelectorAll(".controls li").forEach((dot, index) => {
          dot.addEventListener("click", () => {
            slideIndex = index;
            setIndexHandler();
            dot.classList.toggle("selected-dot"); // add
          });
        });

        const startAnimating = () => {
          intervalId = setInterval(() => {
            windowWidth > 768 && resetStyles();

            document
              .querySelector(".controls .selected-dot")
              .classList.toggle("selected-dot"); // rem
            slideIndex = slideIndex < slidesCount ? slideIndex + 1 : 0;
            dotParent.children[slideIndex].classList.toggle("selected-dot"); // add

            if (windowWidth > 768) {
              slider.children[slideIndex].style.zIndex = 1;
              slider.children[slideIndex].style.opacity = 1;
            } else {
              slider.style.transform = "translate(" + slideIndex * -100 + "%)";
            }
          }, slideInterval);
        };
        startAnimating();

        const goToNextSlide = () => {
          resetStyles();
          slideIndex = slideIndex < slidesCount ? slideIndex + 1 : 0;
          setIndexHandler();
          dotParent.children[slideIndex].classList.toggle("selected-dot"); // add
          slider.children[slideIndex].style.zIndex = 1;
          slider.children[slideIndex].style.opacity = 1;
        };

        const goToPrevSlide = () => {
          resetStyles();
          slideIndex = slideIndex > 0 ? slideIndex - 1 : slidesCount;
          setIndexHandler();
          dotParent.children[slideIndex].classList.toggle("selected-dot"); // add
          slider.children[slideIndex].style.zIndex = 1;
          slider.children[slideIndex].style.opacity = 1;
        };

        carousel.addEventListener("mouseover", () => {
          clearInterval(intervalId);
        });

        carousel.addEventListener("mouseout", () => {
          startAnimating();
        });

        leftArrow.addEventListener("click", goToPrevSlide);
        rightArrow.addEventListener("click", goToNextSlide);
      })
      .catch((error) => console.error("Error fetching partners:", error));
  });
}

export { carouselHandler };
