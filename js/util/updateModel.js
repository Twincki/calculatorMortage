import { UPDATE_FORM_EVENT } from "./invariable.js";

function updateModel(element, data) {
  element.dispatchEvent(
    new CustomEvent(UPDATE_FORM_EVENT, {
      bubbles: true,
      detail: { ...data },
    })
  );
}

export default updateModel;
