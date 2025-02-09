// currently in use via Webflow's "Custom code", before </body>
// routes dev, staging and prod scripts based on localhost:3000 and domain's name

(function () {
  const srcProd =
    "https://cdn.jsdelivr.net/gh/daniil-yatsenko/good-behaviour@main/prod/live/versions/index%401.0.0.js";
  const srcStage =
    "https://cdn.jsdelivr.net/gh/daniil-yatsenko/good-behaviour@main/prod/staging/versions/index%401.0.0.js";

  const body = document.getElementsByTagName("body")[0];
  const isWebflow = window.location.hostname.includes("webflow.io");

  function loadScript(src, type = "text/javascript", module = false) {
    const script = document.createElement("script");
    script.src = src;
    script.type = module ? "module" : type;
    body.appendChild(script);
  }

  if (!isWebflow) {
    loadScript(srcProd);
  } else {
    fetch("http://localhost:3001")
      .then((response) => {
        if (response.ok) {
          loadScript("http://localhost:3001/@vite/client", "module", true);
          loadScript("http://localhost:3001/js/index.js", "module", true);
          console.log("using localhost scripts");
        } else {
          loadScript(srcStage);
          console.log("using CDN staging scripts");
        }
      })
      .catch(() => {
        loadScript(srcStage);
        console.log("using CDN staging scripts");
      });
  }
})();
