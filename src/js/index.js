import { gsap } from "gsap";
import Lenis from "lenis";
import Player from "@vimeo/player";
import barba from "@barba/core";

// gsap defaults
gsap.defaults({
  ease: "power2.inOut",
  duration: 0.3,
});

// css variables
const htmlElement = document.documentElement;
const computed = getComputedStyle(htmlElement);
const cssVariables =
  "background-primary,text-primary,text-secondary,link-primary,navbar";
let lightColors = {};
let darkColors = {};
cssVariables.split(",").forEach(function (item) {
  let lightValue = computed.getPropertyValue(`--light-mode--${item}`);
  let darkValue = computed.getPropertyValue(`--dark-mode--${item}`);
  if (lightValue.length) {
    if (!darkValue.length) darkValue = lightValue;
    lightColors[`--light-mode--${item}`] = lightValue;
    darkColors[`--light-mode--${item}`] = darkValue;
  }
});

///////////////////////////////////
// utility & animation functions //
///////////////////////////////////

var lenisMain;
function initLenisMain() {
  if (lenisMain) {
    lenisMain.destroy();
  }
  lenisMain = new Lenis({
    lerp: 0.95,
    smooth: true,
  });
  const loop = (time) => {
    lenisMain.raf(time);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// supporting function
function changeContactBtnText(string) {
  const button = document.querySelector("[contact-button-desktop]");
  if (button.innerHTML == string) return;
  let tl = gsap.timeline();
  tl.to(button, {
    opacity: 0,
    onComplete: () => {
      button.innerHTML = string;
    },
  });
  tl.to(button, { opacity: 1 });
}

function handleContactClickDesktop() {
  const overlay = document.querySelector(".overlay");
  let isOpened = false;
  if (window.getComputedStyle(overlay).display === "block") {
    isOpened = true;
  }

  return new Promise(async (resolve) => {
    if (isOpened) {
      await hideContactForm();
      changeContactBtnText("Contact");
      await closeOverlay(overlay);
    } else {
      await openOverlay(overlay);
      changeContactBtnText("Close");
      await showContactForm();
    }
    resolve;
  });
}

async function handleStudioClickDesktop() {
  if (window.location.pathname != "/") {
    await openOverlay();
    await barba.go("/");
  }
  await hideContactForm();
  await closeOverlay();
  lenisMain.scrollTo("#studio", { duration: 0.5 });
}

function handleStudioClickMobile() {
  if (window.location.pathname != "/") {
    window.location.href = "/#studio";
  } else {
    hideMenuMobile();
    closeOverlay();
    lenisMain.start();
    lenisMain.scrollTo("#studio", { duration: 0.5 });
  }
}

function handleMenuClickMobile() {
  const overlay = document.querySelector(".overlay");
  let isOpened = false;
  if (window.getComputedStyle(overlay).display === "block") {
    isOpened = true;
  }

  return new Promise(async (resolve) => {
    if (isOpened) {
      await hideMenuMobile();
      await closeOverlay();
    } else {
      await openOverlay();
      await showMenuMobile();
    }
    resolve;
  });
}

function openOverlay() {
  const overlay = document.querySelector(".overlay");

  if (window.getComputedStyle(overlay).display === "block") {
    return;
  } else {
    return new Promise((resolve) => {
      const tl = gsap.timeline();

      const filterPanel = document.querySelector(".work_filter-block-wrapper");
      const navbar = document.querySelector(".navbar_navbar");
      if (filterPanel) {
        gsap.to(filterPanel, { opacity: 0 });
        gsap.set(filterPanel, { zIndex: 9, delay: 0.3 });
      }

      tl.set(overlay, { opacity: 0, display: "block" });
      tl.to(overlay, {
        opacity: 1,
        onComplete: resolve,
      });
      tl.set(navbar, { height: "" });
      lenisMain.stop();
    });
  }
}

function closeOverlay() {
  const overlay = document.querySelector(".overlay");

  if (window.getComputedStyle(overlay).display === "none") {
    return;
  } else {
    return new Promise((resolve) => {
      hideContactForm();

      const tl = gsap.timeline();
      const filterPanel = document.querySelector(".work_filter-block-wrapper");

      tl.to(overlay, { opacity: 0 });
      tl.call(
        () => {
          navbarFilterAdjustments();
          changeContactBtnText("Contact");
          if (filterPanel) {
            gsap.set(filterPanel, { zIndex: 12 });
            gsap.to(filterPanel, { opacity: 1 });
          }
          resolve();
        },
        null,
        "-=0.25"
      );
      tl.set(overlay, { opacity: 0, display: "none" });
      lenisMain.start();
    });
  }
}

function showContactForm() {
  const contactForm = document.querySelector(".overlay_contact-form-wrapper");

  if (window.getComputedStyle(contactForm).display === "block") {
    return;
  } else {
    return new Promise((resolve) => {
      const tl = gsap.timeline();

      if (window.innerWidth > 767) {
        // tablet and above
        tl.set(contactForm, { opacity: 0, display: "block" });
        tl.to(contactForm, { opacity: 1, onComplete: resolve });
      } else {
        // mobile
        const navbar = document.querySelector(".navbar_navbar");
        const menu = document.querySelector(".overlay_mobile-menu-wrapper");
        const logo = document.querySelector(".navbar_logo-text");
        const menuBtn = document.querySelector(".navbar_menu-button-wrapper");

        tl.set(contactForm, { opacity: 1, display: "block", x: "100vw" });
        tl.to(menuBtn, { opacity: 0 });
        tl.set(menuBtn, { PointerEvents: "none" }, "<0");
        tl.to(logo, { x: "100vw", duration: 0.4 }, "<0");
        tl.to([navbar, menu], { x: "-100vw", duration: 0.4 }, "<0");
        tl.to(contactForm, { x: "0vw", duration: 0.4 }, "<0");
      }
    });
  }
}

function hideContactForm() {
  const contactForm = document.querySelector(".overlay_contact-form-wrapper");

  if (window.getComputedStyle(contactForm).display === "none") {
    return;
  } else {
    return new Promise((resolve) => {
      const tl = gsap.timeline();

      if (window.innerWidth > 767) {
        // tablet and above
        tl.to(contactForm, { opacity: 0, onComplete: resolve });
        tl.set(contactForm, { opacity: 0, display: "none" });
      } else {
        // mobile
        const navbar = document.querySelector(".navbar_navbar");
        const menu = document.querySelector(".overlay_mobile-menu-wrapper");
        const logo = document.querySelector(".navbar_logo-text");
        const menuBtn = document.querySelector(".navbar_menu-button-wrapper");

        tl.to(contactForm, { x: "100vw", duration: 0.4 });
        tl.to([navbar, menu, logo], { x: "0vw", duration: 0.4 }, "<0");
        tl.to(menuBtn, { opacity: 1, PointerEvents: "" });
        tl.set(contactForm, { opacity: 0, display: "none", x: "" });
        tl.set([navbar, menu, logo], { x: "" });
      }
    });
  }
}

function showMenuMobile() {
  const menu = document.querySelector(".overlay_mobile-menu-wrapper");
  const button = document.querySelector(".navbar_menu-button-wrapper");
  const workDiv = document.querySelector("[navbar-work-mobile]");

  if (window.getComputedStyle(menu).display === "block") {
    return;
  } else {
    return new Promise((resolve) => {
      const tl = gsap.timeline();
      tl.set(menu, { opacity: 0, display: "block" });
      tl.to(menu, { opacity: 1 });
      tl.to([button, workDiv], { opacity: 0 }, "<");
      tl.call(() => {
        button.innerHTML = "Close";
      });
      tl.to(button, { opacity: 1, onComplete: resolve });
    });
  }
}

function hideMenuMobile() {
  const menu = document.querySelector(".overlay_mobile-menu-wrapper");
  const button = document.querySelector(".navbar_menu-button-wrapper");
  const workDiv = document.querySelector("[navbar-work-mobile]");

  if (window.getComputedStyle(menu).display === "none") {
    return;
  } else {
    return new Promise((resolve) => {
      const tl = gsap.timeline();

      tl.to([menu, button], { opacity: 0 });
      tl.call(() => {
        button.innerHTML = "Menu";
      });
      tl.to([button, workDiv], { opacity: 1, onComplete: resolve });
      tl.set(menu, { opacity: 0, display: "none" });
    });
  }
}

function contactCaptchaHider() {
  const field = document.querySelector(".overlay_contact-form_input-field");
  const captcha = document.querySelector(
    ".overlay_contact-form_captcha-wrapper"
  );

  if (captcha && field) {
    field.addEventListener("focus", () => {
      gsap.set(captcha, { opacity: 0, display: "block" });
      gsap.to(captcha, { opacity: 1 });
    });
  }
}

function unwrap(element) {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
}

function navbarProjectName(page) {
  const projectName = page.querySelector("[project-name]").textContent;
  let workDiv = document.querySelector("[navbar-work]");
  if (window.innerWidth < 768) {
    workDiv = document.querySelector("[navbar-work-mobile]");
  }

  const projectNameDiv = `
<div class="navbar_added-element">
    <div class="navbar_comma-separator">, </div>
    <h1 class="navbar_added-text">${projectName}</h1>
</div>
`;
  workDiv.innerHTML += projectNameDiv;

  let newElement = workDiv.querySelector(".navbar_added-element");
  const tl = gsap.timeline();
  tl.set(newElement, { opacity: 0, width: "0rem", display: "flex" });
  tl.to(newElement, {
    opacity: 1,
    width: "auto",
    onComplete: () => {
      workDiv.querySelector("h1").style.textOverflow = "ellipsis";
    },
  });
}

function navbarRemoveAddedElements() {
  document.querySelectorAll(".navbar_added-element").forEach((element) => {
    gsap.to(element, {
      opacity: 0,
      width: "0rem",
      onComplete: () => {
        element.remove();
      },
    });
  });
}

function navbarWorkTitleMobile() {
  if (window.innerWidth > 768) return;

  function showCaption() {
    gsap.set(captionArea, { display: "block", opacity: 0 });
    gsap.to(captionArea, { opacity: 1 });
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
  let visiblePages = ["work", "projects"];
  let shouldBeVisible = false;

  // check if block should be visible
  visiblePages.forEach((page) => {
    if (window.location.pathname.includes(page)) {
      shouldBeVisible = true;
    }
  });

  // check if "work" has to be grey
  if (window.location.pathname.includes("work")) {
    captionArea.firstChild.classList.add("text-color-secondary");
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
}

function workFilterColoring(page) {
  let clearBtn = page.querySelector(
    "[fs-cmsfilter-element='clear']"
  ).parentElement;
  let filterBtns = page.querySelectorAll("[filter]");

  clearBtn.classList.add("is-active");

  clearBtn.addEventListener("click", () => {
    clearBtn.classList.add("is-active");
  });

  filterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      clearBtn.classList.remove("is-active");
    });
  });
}

// adjust filter block on Work page
function unwrapFilterBlock(page) {
  let filterPanel = page.querySelector(".work_filter-block-wrapper");

  if (filterPanel) {
    unwrap(page.querySelector(".work_filter-collection-list-wrapper"));
    unwrap(page.querySelector(".work_filter-collection-list"));

    // hide comma on the last filter
    const lastCheckbox = $(".work_filter-checkbox-field").last();
    lastCheckbox.get(0).querySelector(".comma-separator").style.display =
      "none";
  }
}

// show / hide filter panel on scroll
let filterBlockScrollEvent;
function filterBlockOnScroll(page) {
  if (window.innerWidth > 767) return;
  if (filterBlockScrollEvent) {
    window.removeEventListener("scroll", filterBlockScrollEvent);
  }

  const filterPanel = page.querySelector(".work_filter-block");
  const navbar = document.querySelector(".navbar_navbar");
  if (!filterPanel) return;

  gsap.set(navbar, { height: "" });
  const navbarHeight = navbar.clientHeight;
  const navbarPadding = parseFloat(
    window.getComputedStyle(navbar.children[0]).paddingBottom
  );
  const adjustedHeight =
    filterPanel.children[0].clientHeight + navbarHeight + navbarPadding;

  gsap.set(filterPanel, { opacity: 0 });
  setTimeout(() => {
    gsap.set(navbar, { height: navbarHeight });
  }, 500);

  async function showFilterPanel() {
    return new Promise((resolve) => {
      let tl = gsap.timeline({ onComplete: resolve });
      tl.to(navbar, { height: adjustedHeight });
      tl.to(filterPanel, { opacity: 1 });
    });
  }

  async function hideFilterPanel() {
    return new Promise((resolve) => {
      let tl = gsap.timeline({ onComplete: resolve });
      tl.to(filterPanel, { opacity: 0 });
      tl.to(navbar, { height: navbarHeight });
    });
  }

  let lastScrollTop = 0;
  let lastDirection = null;
  let isProcessing = true;
  setTimeout(() => {
    isProcessing = false;
  }, 500);

  filterBlockScrollEvent = async function (event) {
    if (isProcessing) return;
    if (window.innerWidth > 767) return;

    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    let currentDirection = currentScrollTop > lastScrollTop ? "down" : "up";

    if (currentScrollTop === lastScrollTop) return;

    if (currentDirection !== lastDirection) {
      isProcessing = true;

      if (currentDirection === "down") {
        await showFilterPanel();
      } else {
        await hideFilterPanel();
      }

      lastDirection = currentDirection;
      isProcessing = false;
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Ensure it doesn't go below 0
  };

  window.addEventListener("scroll", filterBlockScrollEvent);
}

// adjust navbar and filters for the Work page
function navbarFilterAdjustments(page = document) {
  const navbar = document.querySelector(".navbar_navbar");
  gsap.set(navbar, { height: "" });

  const filterPanel = page.querySelector(".work_filter-block-wrapper");
  if (filterPanel) {
    let adjustedHeight = filterPanel.clientHeight + navbar.clientHeight;
    gsap.set(navbar, { height: adjustedHeight });
  }
}

let projectsForHover = null;
function projectPreviewHover(page) {
  if (window.innerWidth > 992) {
    if (projectsForHover) {
      projectsForHover = null;
    }
    projectsForHover = page.querySelectorAll(".project-preview_wrapper");

    projectsForHover.forEach((project) => {
      let visual = project.querySelector(".project-preview_visual");
      let title = project.querySelector(".project-preview_caption");
      gsap.to(title, { opacity: 0 });
      project.addEventListener("mouseover", () => {
        gsap.to(title, { opacity: 1 });
        gsap.to([visual.children], { scale: 1.015 });
      });
      project.addEventListener("mouseout", () => {
        gsap.to(title, { opacity: 0 });
        gsap.to([visual.children], { scale: 1 });
      });
    });
  }
}

// Vimeo video functionality via Player SDK
let vimeoVideoContainers = null;
function videos(page) {
  if (vimeoVideoContainers) {
    vimeoVideoContainers = null;
  }
  vimeoVideoContainers = page.querySelectorAll(".video-wrapper");

  vimeoVideoContainers.forEach((videoContainer) => {
    let vimeoId = videoContainer.getAttribute("vimeo_id");
    if (window.innerWidth < 992)
      vimeoId = videoContainer.getAttribute("vimeo_id_mobile");
    if (!vimeoId) {
      return;
    }

    let containerRatio =
      videoContainer.offsetWidth / videoContainer.offsetHeight;

    let settings = {
      id: vimeoId,
      width: videoContainer.offsetWidth,
      height: videoContainer.offsetHeight,
      quality: "1080p",
      background: true,
      dnt: true, // Prevent the player from tracking session data
    };

    let player = new Player(videoContainer.firstElementChild, settings);

    player.setQuality("1080p");

    function resizePlayer() {
      let newContainerRatio =
        videoContainer.offsetWidth / videoContainer.offsetHeight;

      // Resize the player accordingly
      player.element.width = videoContainer.offsetWidth;
      player.element.height = videoContainer.offsetHeight;

      // Scale video to fit properly on resize
      Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(
        function (dimensions) {
          let vimeoRatio = dimensions[0] / dimensions[1];
          if (vimeoRatio > newContainerRatio) {
            gsap.set(videoContainer.firstElementChild, {
              scale: vimeoRatio / newContainerRatio + 0.01,
            });
          } else if (vimeoRatio < newContainerRatio) {
            gsap.set(videoContainer.firstElementChild, {
              scale: newContainerRatio / vimeoRatio + 0.01,
            });
          }
        }
      );
    }

    // Add resize event listener with debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizePlayer, 100);
    });

    player.on("play", () => {
      // Initial video scale on play
      Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(
        function (dimensions) {
          let vimeoRatio = dimensions[0] / dimensions[1];
          if (vimeoRatio > containerRatio) {
            gsap.set(videoContainer.firstElementChild, {
              scale: vimeoRatio / containerRatio + 0.01,
            });
          } else if (vimeoRatio < containerRatio) {
            gsap.set(videoContainer.firstElementChild, {
              scale: containerRatio / vimeoRatio + 0.01,
            });
          }
        }
      );
      gsap.to(videoContainer, { opacity: 1 });
    });
  });
}

function scrollToTopButtons() {
  document.querySelectorAll(".scroll-to-top").forEach((button) => {
    button.addEventListener("click", () => {
      if (lenisMain) {
        lenisMain.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo(0, 0);
      }
    });
  });
}

let selectedClientsLoop = null;
function selectedClients() {
  if (selectedClientsLoop) clearInterval(selectedClientsLoop);

  function deselectAll(clients) {
    clients.forEach((client) => {
      const clientNameSlug = client.getAttribute("clientname");
      const clientImage = document
        .querySelector(".selected-clients_image-list-wrapper")
        .querySelector(`[clientname="${clientNameSlug}"]`);
      let tl = gsap.timeline();
      client.classList.remove("is-active");
      tl.to(clientImage, { opacity: 0 });
      tl.set(clientImage, { zIndex: "" });
    });
  }
  function selectClient(client, clientImage) {
    client.classList.add("is-active");
    let tl = gsap.timeline();
    tl.set(clientImage, { opacity: 0 });
    tl.set(clientImage, { zIndex: 3 });
    tl.to(clientImage, { opacity: 1 });
  }

  let nameList = document.querySelectorAll(
    ".selected-clients_client-name-wrapper"
  );
  let imageList = document.querySelectorAll(".selected-clients_image-wrapper");

  // making sure only 1st client name / image are selected
  nameList.forEach((client) => {
    client.classList.remove("is-active");
  });
  imageList.forEach((image) => {
    image.classList.remove("is-active");
  });
  deselectAll(nameList);
  selectClient(nameList[0], imageList[0]);

  // changing selected client every X seconds loop
  let loopIndex = 1;
  const timeToChange = 3000; // set how often the selected client changes (miliseconds)
  selectedClientsLoop = setInterval(() => {
    let clientIndex = loopIndex % nameList.length;
    deselectAll(nameList);
    selectClient(nameList[clientIndex], imageList[clientIndex]);
    loopIndex++;
  }, timeToChange);
}

async function expandNavLogo() {
  const navG = document.querySelector("[nav-logo-g]");
  const navDot = document.querySelector("[nav-logo-dot]");
  const navB = document.querySelector("[nav-logo-b]");

  if (navG.innerHTML == "Good") return;

  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });

    tl.set(navG, { width: "0.76em" });
    tl.set(navB, { width: "0.66em" });

    navG.innerHTML = "Good";
    navDot.innerHTML = "&nbsp;";
    navB.innerHTML = "Behaviour";

    tl.to([navG, navB], { width: "auto" });
  });
}

async function shrinkNavLogo() {
  const navG = document.querySelector("[nav-logo-g]");
  const navDot = document.querySelector("[nav-logo-dot]");
  const navB = document.querySelector("[nav-logo-b]");

  if (navG.innerHTML == "G") return;

  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });

    tl.to(navG, { width: "0.76em" });
    tl.to(navB, { width: "0.66em" }, "<");
    tl.set(navDot, { opacity: 0 });

    tl.call(() => {
      navG.innerHTML = "G";
      navDot.innerHTML = ".";
      navB.innerHTML = "B";
    });

    tl.to(navDot, { opacity: 1 });

    tl.set([navG, navB], { width: "" });
  });
}

// logo on mobile homepage
let mobileHomeLogoEvent = null;
function mobileHomeLogoAnimation() {
  if (window.innerWidth > 767) return;

  if (mobileHomeLogoEvent) {
    window.removeEventListener("scroll", mobileHomeLogoEvent);
  }

  expandNavLogo();

  let lastScrollTop = 0;
  let lastDirection = null;
  let isProcessing = true;
  setTimeout(() => {
    isProcessing = false;
  }, 500);

  mobileHomeLogoEvent = async function (event) {
    if (isProcessing) return;
    if (window.innerWidth > 767) return;

    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    let currentDirection = currentScrollTop > lastScrollTop ? "down" : "up";

    if (currentScrollTop === lastScrollTop) return;

    if (currentDirection !== lastDirection) {
      isProcessing = true;

      if (currentDirection === "down") {
        await shrinkNavLogo();
      } else {
        await expandNavLogo();
      }

      lastDirection = currentDirection;
      isProcessing = false;
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Ensure it doesn't go below 0
  };

  window.addEventListener("scroll", mobileHomeLogoEvent);
}

let homeEmailFormListener;
function homeEmailForm(page) {
  const formBlock = page.querySelector(".home_email-form-block");
  const caption = formBlock.querySelector(".home_email-form_caption");
  const field = formBlock.querySelector(".home_email-form_field");
  const formBtn = formBlock.querySelector(".home_email-form_button");
  const captcha = document.querySelector(".home_email-form_captcha-hider");

  if (homeEmailFormListener) {
    field.removeEventListener("focus", homeEmailFormListener);
  }

  homeEmailFormListener = async function (event) {
    console.log("clicked");
    caption.classList.add("text-color-secondary");
    field.classList.add("text-color-primary");
    gsap.to(formBtn, { opacity: 1, pointerEvents: "auto" });
    gsap.set(captcha, { opacity: 0, pointerEvents: "auto" });
    gsap.to(captcha, { opacity: 1 });
  };

  field.addEventListener("focus", homeEmailFormListener);
}

function openDropdown(dropdown) {
  let q = gsap.utils.selector(dropdown),
    dropdownTl = gsap.timeline();
  dropdown.classList.add("is-opened");
  dropdownTl.set(q(".dropdown_dropdown-content"), {
    height: "0rem",
    opacity: 0,
  });
  dropdownTl.set(q(".dropdown_dropdown-content"), {
    display: "block",
    marginTop: "-7.25rem",
  });
  dropdownTl.to(q(".dropdown_icon-wrapper"), {
    rotate: 225,
    duration: 0.5,
    ease: "power2.inOut",
  });
  dropdownTl.to(q(".dropdown_dropdown-content"), {
    duration: 0.5,
    marginTop: "0rem",
    height: "auto",
    ease: "power2.inOut",
    delay: -0.5,
  });
  dropdownTl.to(
    q(".dropdown_dropdown-content"),
    {
      duration: 0.3,
      opacity: 1,
      ease: "power3.inOut",
      delay: -0.2,
    }
    // "+=0"
  );
}

function closeDropdown(dropdown) {
  let q = gsap.utils.selector(dropdown),
    dropdownTl = gsap.timeline();
  dropdown.classList.remove("is-opened");
  dropdownTl.to(q(".dropdown_dropdown-content"), {
    duration: 0.2,
    opacity: 0,
    ease: "power1.inOut",
  });
  dropdownTl.to(q(".dropdown_icon-wrapper"), {
    rotate: 0,
    duration: 0.5,
    ease: "power2.inOut",
    delay: -0.2,
  });
  dropdownTl.to(q(".dropdown_dropdown-content"), {
    duration: 0.4,
    height: "0rem",
    marginTop: "-7.25rem",
    ease: "power2.inOut",
    delay: -0.3,
  });
  dropdownTl.set(q(".dropdown_dropdown-content"), {
    display: "none",
  });
  dropdownTl.set(q(".dropdown_dropdown-content"), {
    marginTop: "0rem",
  });
}

// handles dropdown animations
function animateDropdowns() {
  document
    .querySelectorAll(".dropdown_dropdown:not(.animated)")
    .forEach((dropdown) => {
      let dropdownToggle = dropdown.querySelector(".dropdown_dropdown-toggle");

      dropdownToggle.addEventListener("click", () => {
        // if it was opened before
        if (dropdown.classList.contains("is-opened")) {
          closeDropdown(dropdown);
        } else {
          if (document.querySelector(".dropdown_dropdown.is-opened")) {
            closeDropdown(
              document.querySelector(".dropdown_dropdown.is-opened")
            );
          }
          openDropdown(dropdown);
        }
      });
    });
}

///////////
// barba //
///////////

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {},
      afterEnter(data) {
        selectedClients();
        mobileHomeLogoAnimation();
        homeEmailForm(data.next.container);
      },
      async beforeLeave() {
        clearInterval(selectedClientsLoop);
        if (mobileHomeLogoEvent) {
          window.removeEventListener("scroll", mobileHomeLogoEvent);
        }
        await shrinkNavLogo();
      },
    },
    {
      namespace: "work",
      async beforeEnter(data) {
        await hideContactForm();
        navbarFilterAdjustments(data.next.container);
        workInit(data.next.container);
      },
      afterEnter(data) {
        filterBlockOnScroll(data.next.container);
        navbarWorkTitleMobile();
        workFilterColoring(data.next.container);
      },
      beforeLeave() {
        navbarWorkTitleMobile();
        if (filterBlockScrollEvent) {
          window.removeEventListener("scroll", filterBlockScrollEvent);
        }
      },
    },
    {
      namespace: "project",
      afterEnter(data) {
        navbarWorkTitleMobile();
        navbarProjectName(data.next.container);
      },
      beforeLeave() {
        navbarRemoveAddedElements();
        navbarWorkTitleMobile();
      },
    },
    {
      namespace: "article",
      afterEnter() {
        initCopyLink();
      },
    },
  ],
  transitions: [
    {
      name: "default-transition",
      async once() {
        setTimeout(() => {
          closeOverlay();
        }, 400);
      },
      async leave() {
        await hideMenuMobile();
        await openOverlay();
      },
      async beforeEnter() {
        initLenisMain();
        await lenisMain.scrollTo(0, { immediate: true });
      },
      afterEnter(data) {
        projectPreviewHover(data.next.container);
        videos(data.next.container);
        scrollToTopButtons();
        closeOverlay();
      },
    },
  ],
});

////////////////////
// init functions //
////////////////////

function mainInit() {
  initLenisMain();
  contactCaptchaHider();
  projectPreviewHover(document);
  scrollToTopButtons();
  videos(document);

  // button handlers
  if (window.innerWidth > 767) {
    // tablet and above
    let contactBtnDesktop = document.querySelector("[contact-desktop]");
    contactBtnDesktop.addEventListener("click", handleContactClickDesktop);

    let studioBtnDesktop = document.querySelector("[studio-desktop]");
    studioBtnDesktop.addEventListener("click", handleStudioClickDesktop);
  } else {
    // mobile
    let menuBtnMobile = document.querySelector("[menu-mobile]");
    menuBtnMobile.addEventListener("click", handleMenuClickMobile);

    let contactBtnMobile = document.querySelector("[contact-mobile]");
    contactBtnMobile.addEventListener("click", showContactForm);

    let closeFormBtnMobile = document.querySelector("[close-form-mobile]");
    closeFormBtnMobile.addEventListener("click", hideContactForm);

    let studioBtnMobile = document.querySelector("[studio-mobile]");
    studioBtnMobile.addEventListener("click", handleStudioClickMobile);
  }

  // desktop logo animation eventListener
  if (window.innerWidth > 992) {
    expandNavLogo();
  }
  let lastScrollTop = 0;
  let lastDirection = null;
  let isProcessing = false;
  window.addEventListener("scroll", async function () {
    if (isProcessing) return;
    if (window.innerWidth < 992) return;

    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    let currentDirection = currentScrollTop > lastScrollTop ? "down" : "up";

    if (currentScrollTop === lastScrollTop) return;

    if (currentDirection !== lastDirection) {
      isProcessing = true;

      if (currentDirection === "down") {
        await shrinkNavLogo();
      } else {
        await expandNavLogo();
      }

      lastDirection = currentDirection;
      isProcessing = false;
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Ensure it doesn't go below 0
  });

  // reload page if the breakpoint changes; debounce 100ms
  window.addEventListener(
    "resize",
    (() => {
      let timeoutId;
      let scrollPosition;
      let currentBreakpoint = getBreakpoint(window.innerWidth);

      function getBreakpoint(width) {
        if (width < 480) return "m-p";
        if (width >= 480 && width <= 767) return "m-l";
        if (width >= 768 && width <= 991) return "tablet";
        return "desktop";
      }

      return async function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          const newBreakpoint = getBreakpoint(window.innerWidth);
          if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            scrollPosition = lenisMain.scroll;
            if (currentBreakpoint == "desktop") {
              expandNavLogo();
            } else {
              shrinkNavLogo();
            }

            await barba.go(window.location.pathname);
            await lenisMain.scrollTo(scrollPosition);
          }
        }, 0);
      };
    })()
  );
}

function workInit(page) {
  window.fsAttributes.cmsfilter.destroy();
  window.fsAttributes.cmsfilter.init();
  unwrapFilterBlock(page);
}

///////////////
// main body //
///////////////

document.addEventListener("DOMContentLoaded", mainInit);
