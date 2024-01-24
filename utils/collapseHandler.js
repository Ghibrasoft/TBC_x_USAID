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
export { collapseHandler };
