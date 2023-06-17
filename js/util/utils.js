function updateMinPercents(minPaymentsPercent) {
  document.querySelector("#percents-from").textContent =
    minPaymentsPercent * 100 + "%";
}

export { updateMinPercents };
