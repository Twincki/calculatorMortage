import { roundNumber } from '../util/roundNumber.js';

function computation(getData) {
  const data = getData();

  // Количество месяцев
  const months = data.time * 12

  // Сумма кредита
  const totalCost = data.cost - data.payment

  // Месячная ставка
  const mothRate = data.selectedProgram / 12

  // Общая ставка
  const generalRate = (1 + mothRate) ** months

  // Ежемесячный платеж
  const totalMonthPayment = (totalCost * mothRate * generalRate) / (generalRate - 1)

  // Переплата
  const totalOverpayment = totalMonthPayment * months - totalCost

  // Процентная ставка
  document.querySelector("#total-percent").textContent = `${data.selectedProgram * 100}%`;

  document.querySelector("#total-month-payment").textContent = roundNumber(totalMonthPayment);
  document.querySelector("#total-cost").textContent = roundNumber(totalCost);
  document.querySelector("#total-overpayment").textContent = roundNumber(totalOverpayment);
}

export default computation;
