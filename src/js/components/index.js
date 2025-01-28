// import { exampleComponent } from "./exampleComponent.js";
import { videosInit, videosCleanup } from "./vimeo";
import { emailFormsCapthaInit, captchaRestart } from "./pageCaptchas";
import { thumbnailsInit, thumbnailsCleanup } from "./thumbnails";
import { navbarDirTitleMobile } from "./navbar";

export const componentsInit = (page) => {
  videosInit(page);
  emailFormsCapthaInit(page);
  captchaRestart(page);
  thumbnailsInit(page);
  navbarDirTitleMobile();
  console.log("components init");
};

export const componentsCleanup = (page) => {
  videosCleanup(page);
  thumbnailsCleanup(page);
  navbarDirTitleMobile();
  console.log("components cleanup");
};
