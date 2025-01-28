import { gsap } from "gsap";

gsap.defaults({
  ease: "power2.inOut",
  duration: 0.3,
});

function onHoverIn(visual, title) {
  if (visual) {
    gsap.to([visual], { scale: 1.015 });
  }
  if (title) {
    gsap.to(title, { opacity: 1 });
  }
}

function onHoverOut(visual, title) {
  if (visual) {
    gsap.to([visual], { scale: 1 });
  }
  if (title) {
    gsap.to(title, { opacity: 0 });
  }
}

// Stores event listeners to remove them later
const eventListenersMap = new WeakMap();

const thumbnailsInit = (page) => {
  if (window.innerWidth > 992) {
    const projectThumbForHover = page.querySelectorAll(
      ".project-preview_wrapper"
    );

    const articleThumbsForHover = page.querySelectorAll(
      ".image-wrapper.is-article-thumbnail"
    );

    projectThumbForHover.forEach((thumbnail) => {
      const visuals = thumbnail.querySelector(
        ".project-preview_visual"
      ).children;
      const title = thumbnail.querySelector(".project-preview_caption");
      gsap.to(title, { opacity: 0 });

      // Create event listeners for hover
      const hoverInListener = () => onHoverIn(visuals, title);
      const hoverOutListener = () => onHoverOut(visuals, title);

      // Add to WeakMap for cleanup
      eventListenersMap.set(thumbnail, { hoverInListener, hoverOutListener });

      thumbnail.addEventListener("mouseover", hoverInListener);
      thumbnail.addEventListener("mouseout", hoverOutListener);
    });

    articleThumbsForHover.forEach((thumbnail) => {
      const visual = thumbnail.firstElementChild;

      const hoverInListener = () => onHoverIn(visual, null);
      const hoverOutListener = () => onHoverOut(visual, null);

      eventListenersMap.set(thumbnail, { hoverInListener, hoverOutListener });

      thumbnail.addEventListener("mouseover", hoverInListener);
      thumbnail.addEventListener("mouseout", hoverOutListener);
    });
  }
  console.log("thumbs initiated");
};

const thumbnailsCleanup = (page) => {
  const projectThumbForHover = page.querySelectorAll(
    ".project-preview_wrapper"
  );

  const articleThumbsForHover = page.querySelectorAll(
    ".image-wrapper.is-article-thumbnail"
  );

  projectThumbForHover.forEach((thumbnail) => {
    const listeners = eventListenersMap.get(thumbnail);
    if (listeners) {
      thumbnail.removeEventListener("mouseover", listeners.hoverInListener);
      thumbnail.removeEventListener("mouseout", listeners.hoverOutListener);
      eventListenersMap.delete(thumbnail);
    }
  });

  articleThumbsForHover.forEach((thumbnail) => {
    const listeners = eventListenersMap.get(thumbnail);
    if (listeners) {
      thumbnail.removeEventListener("mouseover", listeners.hoverInListener);
      thumbnail.removeEventListener("mouseout", listeners.hoverOutListener);
      eventListenersMap.delete(thumbnail);
    }
  });
  console.log("thumbs cleaned up");
};

export { thumbnailsInit, thumbnailsCleanup };
