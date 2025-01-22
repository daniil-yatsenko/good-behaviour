import { gsap } from "gsap";

function colorModeToggle() {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }

  const htmlElement = document.documentElement;
  const computed = getComputedStyle(htmlElement);
  let toggleEl;
  let togglePressed = "false";

  let colorModeDuration = 0.4;
  let colorModeEase = "power2.inOut";
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

  function setColors(colorObject, animate) {
    if (typeof gsap !== "undefined" && animate) {
      gsap.to(htmlElement, {
        ...colorObject,
        duration: colorModeDuration,
        ease: colorModeEase,
      });
    } else {
      Object.keys(colorObject).forEach(function (key) {
        htmlElement.style.setProperty(key, colorObject[key]);
      });
    }
  }

  function goDark(dark, animate) {
    if (dark) {
      localStorage.setItem("dark-mode", "true");
      htmlElement.classList.add("dark-mode");
      setColors(darkColors, animate);
      togglePressed = "true";
    } else {
      localStorage.setItem("dark-mode", "false");
      htmlElement.classList.remove("dark-mode");
      setColors(lightColors, animate);
      togglePressed = "false";
    }
    if (typeof toggleEl !== "undefined") {
      toggleEl.forEach(function (element) {
        element.setAttribute("aria-pressed", togglePressed);
      });
    }
  }

  // add live clock to the navbar and mobile menu
  function clock() {
    const clocks = document.querySelectorAll(".clock");
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Australia/Sydney", // closest time zone for Byron Bay
      hour12: true,
    };

    clocks.forEach((clock) => {
      let now = new Date();
      let timeString = now.toLocaleTimeString("en-AU", options);
      clock.textContent = timeString;

      setInterval(() => {
        now = new Date();
        timeString = now.toLocaleTimeString("en-AU", options);
        clock.textContent = timeString;
      }, 5000);
    });
  }

  // set light / dark mode based on device's mode and cookies
  function checkPreference(e) {
    goDark(e.matches, false);
  }
  const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
  colorPreference.addEventListener("change", (e) => {
    checkPreference(e);
  });

  let storagePreference = localStorage.getItem("dark-mode");
  if (storagePreference !== null) {
    storagePreference === "true" ? goDark(true, false) : goDark(false, false);
  } else {
    checkPreference(colorPreference);
  }

  window.addEventListener("DOMContentLoaded", (event) => {
    clock();
    toggleEl = document.querySelectorAll("[color-toggle]");
    toggleEl.forEach(function (element) {
      element.setAttribute("aria-label", "View Dark Mode");
      element.setAttribute("role", "button");
      element.setAttribute("aria-pressed", togglePressed);
    });
    toggleEl.forEach(function (element) {
      element.addEventListener("click", function () {
        let darkClass = htmlElement.classList.contains("dark-mode");
        darkClass ? goDark(false, true) : goDark(true, true);
      });
    });
  });
}

colorModeToggle();
