// code snippet for Webflow router
// should route between localhost:3000, prod/staging and prod/main
// make sure to update the CDN links

(function () {
  const head = document.getElementsByTagName("head")[0]; //remember to update to <body> if necessary

  const isWebflow = window.location.hostname.includes("webflow.io");

  function loadScript(src, type = "text/javascript", module = false) {
    const script = document.createElement("script");
    script.src = src;
    script.type = module ? "module" : type;
    head.appendChild(script);
  }

  if (!isWebflow) {
    loadScript("https://XXX/prod-script.js"); // update to prod CDN link
  } else {
    fetch("http://localhost:3000")
      .then((response) => {
        if (response.ok) {
          // Localhost is available, load Vite's dev scripts
          loadScript("http://localhost:3000/@vite/client", "module", true);
          loadScript("http://localhost:3000/js/index.js", "module", true);
        } else {
          // If localhost is not available, load the staging script
          loadScript("https://XXX/staging-script.js"); // update to staging CDN link
        }
      })
      .catch(() => {
        // If localhost is not reachable, load the staging script
        loadScript("https://XXX/staging-script.js"); // update to staging CDN link
      });
  }
})();
