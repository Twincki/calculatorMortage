export function updateModel(element: HTMLElement, data: Object) {
  element.dispatchEvent(
    new CustomEvent("updateForm", {
      bubbles: true,
      detail: { ...data },
    }),
  );
}
