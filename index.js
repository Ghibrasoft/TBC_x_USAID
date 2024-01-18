// change header bg onScroll
const header = document.getElementById("header");

function changeHeaderBg() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    header.classList.add("bg-opacity");
  } else {
    header.classList.remove("bg-opacity");
  }
}

window.addEventListener("scroll", changeHeaderBg);
