import * as Model from "./model.js";
import programs from "./view/radioPrograms.js";
import updateResultView from "./view/updateResultsView.js";
import { UPDATE_EVENTS } from "./consts.js";
import { updateMinPercents } from "./view/utils.js";

// Стоимость недвижимости
import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

// Первоначальный взнос
import paymentInput from "./view/paymentInput.js";
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

  // Инициализация значений слайдера стоимости недвижимости
  const cleavePayment = paymentInput(getData);

  document.addEventListener("updateForm", ({ detail }) => {
    Model.setDate(detail);
    // Обновление всего что связанно с внешним видом формы основываясь на  данных из модели
    updateFormAndSlider(getData());
    // Обновление значений на странице
    updateResultView(detail.selectedProgram);
  });

  function updateFormAndSlider({ onUpdate, cost, minPaymentsPercent }) {
    // Обновление
    if (onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
      updateMinPercents(minPaymentsPercent);
      console.log(minPaymentsPercent);
    }
    // Значение стоимости недвижимости
    if (onUpdate !== UPDATE_EVENTS.INPUT_COST) {
      cleaveCost.setRawValue(cost);
    }
    // Значение стоимости недвмижимости слайдера
    if (onUpdate !== UPDATE_EVENTS.SLIDER_COST) {
      sliderCost.noUiSlider.set(cost);
    }
  }
};
