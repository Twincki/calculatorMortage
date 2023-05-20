import * as Module from "./model.js";

import programs from "./view/radioPrograms.js";
import updateResultView from "./view/updateResultsView.js";
import costInput from "./view/costInput.js";

window.onload = function () {
  const getData = Module.getData;

  //init programs
  programs(getData);

  //init cost input
  costInput(getData);

  document.addEventListener("updateForm", ({ detail }) => {
    Module.setDate(detail);

    //Update results block
    updateResultView(detail.selectedProgram);
  });
};
