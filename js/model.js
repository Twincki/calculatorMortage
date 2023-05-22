import { Logger } from "./util/logger/Logger.js";
import { UPDATE_EVENTS } from "./consts.js";

let data = {
  selectedProgram: 0.1,
  cost: 10000000,
  minPrice: 375000,
  maxPrice: 100000000,
  onUpdate: UPDATE_EVENTS.NULL,
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
  // Обновление цены базовых значений
  if (newDate.onUpdate === UPDATE_EVENTS.INPUT_COST) {
    // Если стоимость меньше минимальной цены
    if (newDate.cost < data.minPrice) newDate.cost = data.minPrice;
    // Если стоимость больше максимальной цены
    if (newDate.cost > data.maxPrice) newDate.cost = data.maxPrice;
  }

  data = { ...data, ...newDate };
  Logger.success("[UPDATED MODEL DATA]", data);
}

export { getData, setDate };
