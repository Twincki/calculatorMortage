function updateResultView(result) {
  document.querySelector("#total-percent").textContent = result * 100 + "%";
}

export default updateResultView;
