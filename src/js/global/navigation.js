import { gsap } from "gsap";

const navbarSelector = () => {
  const navbar = document.querySelector(".navbar_menu-wrapper");
  const navLinks = navbar.querySelectorAll(".navbar_nav-link");
  const selector = navbar.querySelector(".navbar_page-selector");
  let tl = gsap.timeline();

  let scale = 0; // in px
  let isHovered = false;
  let isScaled = false;
  let isClicked = false;

  // move the selector div to the navLink of choice
  const animateSelector = (navLink, delay = 0) => {
    tl.clear();
    const nextLinkRect = navLink.getBoundingClientRect();
    const parentRect = navLink.parentElement.getBoundingClientRect();

    const nextLinkDimensions = {
      width: nextLinkRect.width,
      height: nextLinkRect.height,
      top: nextLinkRect.top - parentRect.top,
      left: nextLinkRect.left - parentRect.left,
    };

    if (isHovered && !isScaled) {
      tl.to(selector, {
        width: `-=${scale}px`,
        height: nextLinkDimensions.height - scale,
        x: `+=${scale / 2}px`,
        y: nextLinkDimensions.top + scale / 2,
        ease: "back.inOut(1.7)",
      });
    }
    tl.to(selector, {
      width: nextLinkDimensions.width - scale,
      height: nextLinkDimensions.height - scale,
      x: nextLinkDimensions.left + scale / 2,
      y: nextLinkDimensions.top + scale / 2,
      ease: "back.inOut(1.7)",
      duration: 0.5,
      delay: delay - 0.1,
    });
    if (isClicked) {
      // tl.to(selector, { borderWidth: "*=2", duration: 0.1 });
      // isClicked = false;
      // tl.to(selector, { borderWidth: "/=2", duration: 0.1 });
    }
    if (!isHovered && isScaled) {
      tl.to(selector, {
        width: `+=${scale}px`,
        height: nextLinkDimensions.height,
        x: `-=${scale / 2}px`,
        y: nextLinkDimensions.top,
      });
    }
  };

  // returns the navLink of the current page / directory
  const currentNavLink = () => {
    let currentLink = Array.from(navLinks).filter(
      (link) => link.getAttribute("href") === "/"
    )[0]; // return "home" navLink by default

    let pathname = window.location.pathname;

    navLinks.forEach((link) => {
      let href = link.getAttribute("href");
      if (href != "/" && pathname.includes(href)) {
        currentLink = link;
      }
    });

    return currentLink;
  };

  gsap.set(selector, { display: "block", width: "0rem" });
  animateSelector(currentNavLink());

  navLinks.forEach((navLink) => {
    navLink.addEventListener("mouseenter", () => {
      scale = 4;
      isHovered = true;
      animateSelector(navLink);
      isScaled = true;
    });

    navLink.addEventListener("click", () => {
      isClicked = true;
      animateSelector(navLink);
    });
  });

  navbar.addEventListener("mouseleave", () => {
    isHovered = false;
    animateSelector(currentNavLink());
    scale = 0;
    isScaled = false;
  });
};

export { navbarSelector };
