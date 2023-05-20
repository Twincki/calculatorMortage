import { Logger } from "./util/logger/Logger.js";
import { UPDATE_EVENTS } from "./consts.js";

let data = {
  selectedProgram: 0.1,
  cost: 375000,
  minPrice: 375000,
  maxPrice: 100000000,
  programs: {
    base: 0.1,
    it: 0.047,
    gov: 0.046,
    zero: 0.12,
  },
};

function getData() {
  return { ...data };
}

function setDate(newDate) {
  // //Обновление цены
  // //Если стоимость меньше минимальной цены
  if (newDate.onUpdate === UPDATE_EVENTS.INPUT_COST) {
    if (newDate.cost < data.minPrice) newDate.cost = data.minPrice;
    //Если стоимость больше максимальной цены
    if (newDate.cost > data.maxPrice) newDate.cost = data.maxPrice;
  }

  data = { ...data, ...newDate };
  Logger.success("[UPDATED MODEL DATA]", data);
}

export { getData, setDate };
