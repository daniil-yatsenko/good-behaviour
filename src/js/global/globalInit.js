import { navbarSelector } from "./navigation.js";
import { lenisInit } from "./lenis.js";
import { componentsInit } from "../components/index.js";

var lenisMain = lenisInit();
var lenisMain;
export { lenisMain };

const globalInit = () => {
  navbarSelector();
  componentsInit(document);
};

export default globalInit;
