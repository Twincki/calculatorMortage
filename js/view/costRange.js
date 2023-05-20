import { debounce } from "./../util/debounce/debounce.js";
import { Logger } from "./../util/logger/Logger.js";
import { UPDATE_EVENTS } from "./../consts.js";
import updateModel from "./../util/updateModel.js";

function init(getData) {
  const slider = document.querySelector("#slider-cost");
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

  slider.noUiSlider.on("slide", function () {
    //Функция get() используется ябиблиотекой noUiSlider и возвращает значение слайдера
    const sliderValues = slider.noUiSlider.get();

    //Используем метод split для возвращения 0 строки в массиве
    const firstValue = sliderValues.split(".")[0];

    /* Парсим значение слайдера в строку для дальнеешего возврата
     при помощи replace с заменой пробелов */
    const removeSpaces = parseInt(firstValue.replace(/ /g, ""));

    //Обновить модель
    updateModel(slider, {
      cost: removeSpaces,
      onUpdate: UPDATE_EVENTS.COST_SLIDER,
    });
  });

  //initial debounceRange
  // const debounceRange = debounce(([rangeValue]) => {
  //   Logger.info("[SLIDER RANGE]", rangeValue);
  // });

  // slider.noUiSlider.on("update", (...args) => {
  //   debounceRange(...args);
  // });
}

export default init;
