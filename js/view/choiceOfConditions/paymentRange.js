import { UPDATE_EVENTS } from "../../util/invariable.js";
import updateModel from "../../util/updateModel.js";

import { debounce } from "../../util/debounce/debounce.js"

function init(getData) {
  const slider = document.querySelector("#slider-downpayment");
  const { paymentsPercent, minPaymentsPercent, maxPaymentsPercent } = getData();

  noUiSlider.create(slider, {
    start: paymentsPercent * 100,
    connect: "lower",
    tooltips: true,
    step: 1,
    range: {
      min: minPaymentsPercent * 100,
      max: maxPaymentsPercent * 100,
    },

    format: wNumb({
      decimals: 0,
      thousand: " ",
      suffix: " ",
    }),
  });

  // Создаем функцию для debounce
  const uiSliderUpdate = () => {
    // Функция get() используется библиотекой noUiSlider и возвращает значение слайдера
    const sliderValues = slider.noUiSlider.get();

    // Используем метод split для возвращения 0 строки в массиве
    const firstValue = sliderValues.split(".")[0];

    /* Парсим значение слайдера для дальнейшего возврата
     при помощи replace с заменой пробелов, удаляем пробелы при помощи регулярных выражений */
    const removeSpaces = parseInt(firstValue.replace(/ /g, ""));

    // Обновление базовых значений
    updateModel(slider, {
      paymentsPercent: removeSpaces,
      onUpdate: UPDATE_EVENTS.SLIDER_PAYMENT,
    });
  }

  // Вызываем debounce с отложенным временем в 5 миллисекунд
  const debounceUiSlider = debounce(uiSliderUpdate, 5)

  // Метод on позволяет следить за событиями
  slider.noUiSlider.on("slide", debounceUiSlider);
  return slider;
}

export default init;
