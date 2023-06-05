import { UPDATE_EVENTS } from "../invariable.js";
import updateModel from "./../util/updateModel.js";

function init(getData) {
  const slider = document.querySelector("#slider-cost");
  const { cost, minPrice, maxPrice } = getData();

  noUiSlider.create(slider, {
    start: cost,
    connect: "lower",
    tooltips: true,
    step: 100000,
    range: {
      min: minPrice,
      "1%": [400000, 100000],
      "50%": [10000000, 500000],
      max: maxPrice,
    },

    format: wNumb({
      decimals: 0,
      thousand: " ",
      suffix: " ",
    }),
  });

  // Метод on позволяет следить за событиями
  slider.noUiSlider.on("slide", function () {
    // Функция get() используется библиотекой noUiSlider и возвращает значение слайдера
    const sliderValues = slider.noUiSlider.get();

    // Используем метод split для возвращения 0 строки в массиве
    const firstValue = sliderValues.split(".")[0];

    /* Парсим значение слайдера для дальнейшего возврата
     при помощи replace с заменой пробелов, удаляем пробелы при помощи регулярных выражений */
    const removeSpaces = parseInt(firstValue.replace(/ /g, ""));

    // Обновление базовых значений
    updateModel(slider, {
      cost: removeSpaces,
      onUpdate: UPDATE_EVENTS.SLIDER_COST,
    });
  });

  return slider;
}

export default init;
