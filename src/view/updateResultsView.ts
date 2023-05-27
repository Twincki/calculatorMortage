export function updateResultView(result: number) {
  if (!result) return;

  document.querySelector("#total-percent").textContent = `${result * 100}%`;
}
