import { gsap } from "gsap";

gsap.defaults({
  ease: "power2.inOut",
  duration: 0.3,
});

// show directory name in mobile navbar
const navbarDirTitleMobile = () => {
  if (window.innerWidth > 768) return;

  function showCaption() {
    gsap.set(captionArea, { display: "block", opacity: 0 });
    gsap.to(captionArea, { opacity: 1, delay: 0.1 });
  }

  function hideCaption() {
    gsap.to(captionArea, {
      opacity: 0,
      onComplete: () => {
        gsap.set(captionArea, { display: "none" });
      },
    });
  }

  function checkVisibility() {
    if (window.getComputedStyle(captionArea).display == "block") {
      return true;
    } else {
      return false;
    }
  }

  const captionArea = document.querySelector(".navbar_mobile-caption-wrapper");
  const captionLink = captionArea.querySelector(
    ".navbar_mobile-directory-link-wrapper"
  );

  let shouldBeVisible = false;
  let slug = "";
  let visibleDirectories = [
    {
      name: "work",
      slug: "/work",
      navText: "Work",
    },
    {
      name: "projects",
      slug: "/projects",
      navText: "Work",
      dirLink: "/work",
    },
    {
      name: "founders",
      slug: "/what-we-do",
      navText: "What We Do",
    },
    {
      name: "journal",
      slug: "/journal",
      navText: "Notes",
    },
  ];

  // check if block should be visible
  visibleDirectories.forEach((page) => {
    if (window.location.pathname.includes(page.slug)) {
      slug = page.slug;
      shouldBeVisible = true;
      captionLink.innerHTML = page.navText;
      if (page.dirLink) captionLink.href = page.dirLink;
      else captionLink.href = slug;
    }
  });

  // check if navText has to be grey

  if (shouldBeVisible && window.location.pathname.endsWith(slug)) {
    captionArea.firstChild.classList.add("text-color-secondary");
    captionLink.href = "#";
  } else {
    captionArea.firstChild.classList.remove("text-color-secondary");
  }

  // toggle visibility
  if (shouldBeVisible == checkVisibility()) {
    return;
  } else {
    if (shouldBeVisible == false) {
      hideCaption();
    } else {
      showCaption();
    }
  }
};

export { navbarDirTitleMobile };
