import noUiSlider from "nouislider";
import wNumb from "wnumb";
import { UPDATE_EVENTS } from "shared/consts/consts";
import { Model } from "shared/types/common";
import { target as TargetElement } from "nouislider/src/nouislider";
import { updateModel } from "shared/util/updateModel";

function init(getData: () => Model) {
  const slider = document.querySelector("#slider-cost") as TargetElement;
  const data = getData();

  noUiSlider.create(slider, {
    start: data.cost,
    connect: "lower",
    tooltips: true,
    step: 100000,
    range: {
      min: data.minPrice,
      "1%": [400000, 100000],
      "50%": [10000000, 500000],
      max: data.maxPrice,
    },

    format: wNumb({
      decimals: 0,
      thousand: " ",
      suffix: " ",
    }),
  });

  // Метод on позволяет следить за событиями
  slider.noUiSlider.on("slide", () => {
    // Функция get() используется библиотекой noUiSlider и возвращает значение слайдера
    const sliderValues = slider.noUiSlider.get();

    // Используем метод split для возвращения 0 строки в массиве
    const firstValue = (sliderValues as any).split(".")[0];

    /* Парсим значение слайдера для дальнеешего возврата
     при помощи replace с заменой пробелов, удаляем пробелы при помощи регулярных выражений */
    const removeSpaces = parseInt(firstValue.replace(/ /g, ""), 10);

    // Обновление базовых знчаений
    updateModel(slider, {
      cost: removeSpaces,
      onUpdate: UPDATE_EVENTS.SLIDER_COST,
    });
  });

  return slider;
}

export default init;
