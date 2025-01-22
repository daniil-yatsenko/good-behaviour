//
// NOT USED - BARBA.JS IMPLEMENTATION INSTEAD
//

import globalInit from "../global/globalInit.js";
import { homeInit } from "../pages/home";
import serviceInit from "../pages/service";

// Initializes page-specific files based on the data-page-name attribute.

export function initPageRouter(page) {
  let pageWrapper = null;
  if (!page) {
    pageWrapper = document.querySelector("[data-barba-namespace]");
  } else {
    pageWrapper = page;
  }

  if (!pageWrapper) {
    console.warn(
      "No data-barba-namespace attribute found on the page wrapper."
    );
    return;
  }

  const pageName = pageWrapper.getAttribute("data-barba-namespace");

  // Initialize general animations for all pages
  globalInit();

  // Mapping of page names to their respective starter functions
  const pageStarters = {
    home: homeInit(page),
    about: null,
    services: serviceInit(),
    work: null,
    project: null,
    // Add additional page starters here
  };

  const starterFunction = pageStarters[pageName];

  if (starterFunction) {
    starterFunction(pageWrapper);
  } else {
    console.warn(`No specific animations found for page: ${pageName}`);
  }
}
