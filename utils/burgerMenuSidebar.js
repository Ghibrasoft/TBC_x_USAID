function menuSidebarHandler() {
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerMenuLines = document.querySelectorAll(".burger-menu-lines span");
  const burgerTopLine = document.querySelector(".top-line");
  const burgerBottomLine = document.querySelector(".bottom-line");
  const sidebarWrapper = document.querySelector(".sidebar-wrapper");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const navbarListItems = document.querySelectorAll(".navbar-list-item");

  burgerMenu.addEventListener("click", () => {
    toggleSidebar();
    toggleAnimationClasses();
    toggleMenuLineColors();
  });

  sidebarOverlay.addEventListener("click", () => {
    toggleSidebar();
    toggleAnimationClasses();
    toggleMenuLineColors();
  });

  navbarListItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (sidebarWrapper.classList.contains("show-sidebar")) {
        toggleSidebar();
        toggleAnimationClasses();
        toggleMenuLineColors();
      }
    });
  });

  document.body.addEventListener("click", (e) => {
    if (
      !burgerMenu.contains(e.target) &&
      !sidebarWrapper.contains(e.target) &&
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
    document.body.classList.toggle("disable-scroll", isOpen);
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
}

export { menuSidebarHandler };
