function updateResultView(result) {
  if (!result) return;

  document.querySelector("#total-percent").textContent = `${result * 100}%`;
}

export default updateResultView;
