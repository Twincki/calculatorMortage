import * as Model from "./model.js";
import programs from "./view/radioPrograms.js";
import updateResultView from "./view/updateResultsView.js";
import { UPDATE_EVENTS } from "./invariable.js";
import { updateMinPercents } from "./view/utils.js";

// Стоимость недвижимости
import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

// Первоначальный взнос
import paymentInput from "./view/paymentInput.js";
import paymentRange from "./view/paymentRange.js"

// Срок кредита 
import timeInput from "./view/timeInput.js"

import { Logger } from "./util/logger/Logger.js";

window.onload = function () {
  const getData = Model.getData;
  const { selectedProgram } = getData();

  // Инициализация базовых значений
  programs(getData);

  // Обновление процентной ставки программ
  updateResultView(selectedProgram);

  // Инициализация значения стоимости недвижимости
  const cleaveCost = costInput(getData);
  // Инициализация значений слайдера стоимости недвижимости
  const sliderCost = costRange(getData);

  // Инициализация значений первоначального взноса
  const cleavePayment = paymentInput(getData);
  // Инициализация значений слайдера первоначального взноса
  const sliderPayment = paymentRange(getData)

  //Инициализация значений срока кредита
  const cleaveTime = timeInput(getData)

  document.addEventListener("updateForm", ({ detail }) => {
    Model.setDate(detail);
    // Обновление всего что связанно с внешним видом формы основываясь на  данных из модели
    updateForm(getData());
    // Обновление значений процентной ставки на странице
    updateResultView(detail.selectedProgram);
  });

  function updateForm({ onUpdate, cost, payment, minPaymentsPercent, maxPaymentsPercent, paymentsPercent }) {
    // Обновление

    // Проценты для программы zero
    if (onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
      const range = {
        range: {
          min: minPaymentsPercent * 100,
          max: maxPaymentsPercent * 100,
        }
      }

      updateMinPercents(minPaymentsPercent);
      // При помощи библиотеки (данный способ есть в документации) обновляем минимальное значение
      sliderPayment.noUiSlider.updateOptions(range)
    }

    // Значение стоимости недвижимости
    if (onUpdate !== UPDATE_EVENTS.INPUT_COST) {
      cleaveCost.setRawValue(cost);
    }
    // Значение стоимости недвижимости слайдера 
    if (onUpdate !== UPDATE_EVENTS.SLIDER_COST) {
      sliderCost.noUiSlider.set(cost);
    }
    // Значение первоначального взноса
    if (onUpdate !== UPDATE_EVENTS.INPUT_PAYMENT) {
      cleavePayment.setRawValue(parseInt(payment))
    }

    // Значение первоначального взноса слайдера 
    if (onUpdate !== UPDATE_EVENTS.SLIDER_PAYMENT) {
      sliderPayment.noUiSlider.set(paymentsPercent * 100)
    }

  }
}; 
