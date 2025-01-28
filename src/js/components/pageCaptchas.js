import { gsap } from "gsap";

gsap.defaults({
  ease: "power2.inOut",
  duration: 0.3,
});

// show page captcha when the form field is focused
const emailFormsCapthaInit = (page) => {
  const forms = page.querySelectorAll(".email-form-wrapper");

  if (forms === null) {
    return;
  }

  forms.forEach((form) => {
    const field = form.querySelector(".email-form_field");
    const button = form.querySelector(".email-form_button");
    const captcha = form.querySelector(".email-form_captcha-hider");
    const caption = form.querySelector(".email-form_caption");

    let formEventListener = async function (event) {
      caption.classList.add("text-color-secondary");
      field.classList.add("text-color-primary");
      gsap.to(button, { opacity: 1, pointerEvents: "auto" });
      gsap.set(captcha, {
        opacity: 0,
        pointerEvents: "auto",
        display: "block",
      });
      gsap.to(captcha, { opacity: 1 });
    };

    field.removeEventListener("focus", formEventListener);
    field.addEventListener("focus", formEventListener);
  });
};

// restart page captcha after Barba.js transition
const captchaRestart = (page) => {
  // each captcha should have a unique ID
  const captcha = page.querySelector(".g-recaptcha");

  if (captcha) {
    const captchaId = captcha.getAttribute("id");
    try {
      grecaptcha.render(captchaId, {
        sitekey: "6LeLEmMqAAAAAPjmEnSIGuAzoDGwpDbkAm1ubiYE",
      });
    } catch (error) {
      console.error("Error rendering reCAPTCHA:", error);
    }
  }
};

export { emailFormsCapthaInit, captchaRestart };
