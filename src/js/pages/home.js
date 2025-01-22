import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisMain } from "../global/globalInit.js";

const homeInit = (page = document) => {
  gsap.registerPlugin(ScrollTrigger);
  let bgImage = page.querySelector("[hero-image]").firstChild;
  let heading = page.querySelector(".hero_text-wrapper").firstChild;
  let section = page.querySelector(".section_hero");
  let stickyParent = page.querySelector(".hero_sticky-parent");

  gsap.set(stickyParent, { height: "150svh" });
  lenisMain.resize();
  ScrollTrigger.update();

  let tl = gsap.timeline();

  tl.to(bgImage, {
    rotate: 180,
    ease: "linear",
    scrollTrigger: {
      trigger: section,
      start: "0",
      end: "bottom top",
      scrub: true,
      id: "bgImage",
    },
  });

  tl.to(heading, {
    y: "-30vh",
    ease: "linear",
    scrollTrigger: {
      trigger: section,
      start: "0",
      end: "center top",
      scrub: true,
      id: "heading",
    },
  });
};

/////////////////////////////////////

const homeCleanup = (page) => {
  console.log("home cleanup");

  let scrollTriggerInstance;
  scrollTriggerInstance = ScrollTrigger.getById("bgImage");

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  scrollTriggerInstance = ScrollTrigger.getById("heading");

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
};

export { homeInit, homeCleanup };
