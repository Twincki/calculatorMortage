import { UPDATE_EVENTS } from "shared/consts/consts";
import { updateMinPercents } from "view/utils";
import { updateResultView } from "view/updateResultsView";
import { PartialModel } from "shared/types/common";
import * as Model from "../model/model";
import programs from "../view/radioPrograms";

// Стоимость недвижимости
import costInput from "../view/costInput";
import costRange from "../view/costRange";

// Первоначальный взнос
import paymentInput from "../view/paymentInput";

// eslint-disable-next-line func-names
export function initController() {
  const { getData } = Model;
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

  document.addEventListener("updateForm", ({ detail }: any) => {
    Model.setDate(detail);
    // Обновление всего что связанно с внешним видом формы основываясь на  данных из модели

    // eslint-disable-next-line no-use-before-define
    updateFormAndSlider(getData());
    // Обновление значений на странице
    updateResultView(detail.selectedProgram);
  });

  function updateFormAndSlider({ onUpdate, cost, minPaymentsPercent }: PartialModel) {
    // Обновление
    if (onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
      updateMinPercents(minPaymentsPercent);
      console.log(minPaymentsPercent);
    }
    // Значение стоимости недвижимости
    if (onUpdate !== UPDATE_EVENTS.INPUT_COST) {
      cleaveCost.setRawValue(String(cost));
    }
    // Значение стоимости недвмижимости слайдера
    if (onUpdate !== UPDATE_EVENTS.SLIDER_COST) {
      sliderCost.noUiSlider.set(cost);
    }
  }
}
