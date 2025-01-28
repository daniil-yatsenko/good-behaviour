import { gsap } from "gsap";

gsap.defaults({
  ease: "power2.inOut",
  duration: 0.3,
});

// copy current page link to clipboard
function initCopyLink(page) {
  let button = page.querySelector("#copyButton");
  if (!button) return;

  let tl = gsap.timeline();
  button.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(window.location.href);
      await tl.to(button, { opacity: 0 });
      button.innerHTML = "Link copied";
      tl.set(button, { color: "#999" });
      tl.to(button, { opacity: 1 });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  });
}

// estimate article read time
function readTime(page) {
  const articleTextBlock = page.querySelector(".article_rich-text");

  if (articleTextBlock) {
    const articleText =
      articleTextBlock.innerText || articleTextBlock.textContent;
    const wordsPerMinute = 200;
    const wordCount = articleText.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    const readingTimeElement = page.querySelector(".article_length-wrapper");
    readingTimeElement.innerText = `${readingTimeMinutes} Min Read`;
  }
}

function anchorScrollOffset(page) {
  const navbar = document.querySelector(".navbar_navbar");
  let offset = 0;
  if (navbar) {
    offset = navbar.getBoundingClientRect().height;
  }

  page.querySelectorAll('.article_rich-text a[href^="#"]').forEach((anchor) => {
    const targetId = anchor.getAttribute("href").substring(1);
    const targetElement = page.querySelector(`#${CSS.escape(targetId)}`);

    anchor.href = "javascript:void(0)";

    anchor.addEventListener("click", function (e) {
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        // lenisMain.scrollTo(targetElement, { offset: -offset, duration: 1 });
      }
    });
  });
}

const articleInit = (page) => {
  initCopyLink(page);
  readTime(page);
  anchorScrollOffset(page);
};

export { articleInit };
