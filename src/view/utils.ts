export function updateMinPercents(minPaymentsPercent: number) {
  document.querySelector("#percents-from").textContent = `${minPaymentsPercent * 100}%`;
}
