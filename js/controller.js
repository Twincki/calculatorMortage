import * as Module from "./model.js";
import programs from "./view/radioPrograms.js";

window.onload = function () {
  const getData = Module.getData;

  programs();

  document.addEventListener("updateForm", (event) => {
    const { selectedProgram } = event.detail;

    Module.setDate({ selectedProgram });
  });
};
