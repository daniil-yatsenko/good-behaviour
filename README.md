# Good Behaviour

commands:

- npm run dev
- npm run build

the project suports multiple build files, e. g. to to have separate scripts in <head> and <body>. To toggle between which file will be built by "npm run build", go to vite config, and toggle between configs' objects.

to update the prod file, manually copy it from src/dist, and paste to prod. Good practice is to keep the versioning. Once the file is updated, remember to also purge the cache in the CDN ([jsdelivr link](https://www.jsdelivr.com/github)).

the code from routerWebflow.js allows to route the script based on the prod / staging, and on if the localhost:300 is up.
