import Player from "@vimeo/player";
import { gsap } from "gsap";

function videosInit(page) {
  let vimeoVideoContainers = page.querySelectorAll(".video-wrapper");

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
      gsap.to(videoContainer, { opacity: "1" });
    });
  });
}

function videosCleanup(page) {
  const videoIframes = page.querySelectorAll("iframe");

  videoIframes.forEach((iframe) => {
    if (iframe.src.includes("vimeo.com")) {
      const playerInstance = new Player(iframe);

      playerInstance
        .destroy()
        .then(() => {})
        .catch((error) => {
          console.error("Error destroying player:", error);
        });
    }
  });
}

export { videosInit, videosCleanup };
