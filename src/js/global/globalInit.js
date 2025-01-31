import { lenisInit } from "./lenis.js";
import { componentsInit } from "../components/index.js";

const globalInit = () => {
  componentsInit(document);
};

export default globalInit;
