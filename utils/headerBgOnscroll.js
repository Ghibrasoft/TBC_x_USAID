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

export { changeHeaderBg };
