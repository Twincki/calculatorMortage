import * as Model from "../model/model.js";
import programs from "./view/radioPrograms.js";
import { UPDATE_EVENTS, UPDATE_FORM_EVENT } from "./util/invariable.js";
import { updateMinPercents } from "./util/utils.js";

// Стоимость недвижимости
import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

// Первоначальный взнос
import paymentInput from "./view/paymentInput.js";
import paymentRange from "./view/paymentRange.js"

// Срок кредита 
import timeInput from "./view/timeInput.js"
import timeSlider from "./view/timeRange.js"

import computation from './util/computation.js'

import { Logger } from "./util/logger/Logger.js";

function initialCalculator() {
  const getData = Model.getData;
  // Инициализация ---------------------
  // Базовые значения
  programs(getData);

  // Обновление процентной ставки программ
  // Инициализация расчёта ипотеки
  computation(getData);

  // Значения стоимости недвижимости
  const cleaveCost = costInput(getData);
  // Значения слайдера стоимости недвижимости
  const sliderCost = costRange(getData);

  // Значения первоначального взноса
  const cleavePayment = paymentInput(getData);
  // Значения слайдера первоначального взноса
  const sliderPayment = paymentRange(getData)

  // Значения срока кредита
  const cleaveTime = timeInput(getData)
  // Значения слайдера срока кредита
  const sliderTime = timeSlider(getData)

  // ------------------- -------------------

  document.addEventListener(UPDATE_FORM_EVENT, ({ detail }) => {
    Model.setDate(detail);
    // Обновление всего что связанно с внешним видом формы основываясь на  данных из модели
    updateForm(getData());

    // Обновление значений процентной ставки на странице
    computation(getData);
  });

  function updateForm({ onUpdate, cost, payment, minPaymentsPercent, maxPaymentsPercent, paymentsPercent, time }) {
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

    // Значение первоначального взноса TODO: Требуется исправление
    if (onUpdate !== UPDATE_EVENTS.INPUT_PAYMENT) {
      cleavePayment.setRawValue(parseInt(payment))
    }
    // Значение первоначального взноса слайдера 
    if (onUpdate !== UPDATE_EVENTS.SLIDER_PAYMENT) {
      sliderPayment.noUiSlider.set(paymentsPercent * 100)
    }

    // Значение срока кредита 
    if (onUpdate !== UPDATE_EVENTS.INPUT_TIME) {
      cleaveTime.setRawValue(time)
    }
    // Значение срока кредита слайдера
    if (onUpdate !== UPDATE_EVENTS.SLIDER_TIME) {
      sliderTime.noUiSlider.set(time)
    }
  }
  Logger.info("CALCULATOR LOADED!");
}

document.addEventListener("DOMContentLoaded", initialCalculator);
