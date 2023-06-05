import { Logger } from "./util/logger/Logger.js";
import { UPDATE_EVENTS } from "./invariable.js";

let data = {
  selectedProgram: 0.1,
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
  minPaymentsPercent: 0.15,
  maxPaymentsPercent: 0.9,
  paymentsPercent: 0.5,
  payment: 6000000,
  getMinPayment: () => data.cost * data.minPaymentsPercent,
  getMaxPayment: () => data.cost * data.maxPaymentsPercent,
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
  if (newDate.onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
    if (newDate.id === "zero-value") {
      data.minPaymentsPercent = 0;
    } else {
      data.minPaymentsPercent = 0.15;
    }
  }

  if (newDate.onUpdate === UPDATE_EVENTS.INPUT_COST || newDate.onUpdate === UPDATE_EVENTS.SLIDER_COST) {
    // Обновление цены базовых значений стоимости недвижимости -------------------------
    // Если стоимость меньше минимальной цены
    if (newDate.cost < data.minPrice) newDate.cost = data.minPrice;
    // Если стоимость больше максимальной цены
    if (newDate.cost > data.maxPrice) newDate.cost = data.maxPrice;
    // ----------------------------------------------------------

    // Обновление цены новых значений первоначального взноса -------------------------
    // Если стоимость меньше минимальной цены
    if (data.payment > data.getMaxPayment()) data.payment = data.getMaxPayment();
    // Если стоимость больше максимальной цены
    if (data.payment < data.getMinPayment()) data.payment = data.getMinPayment()
    // ----------------------------------------------------------
  }

  // При изменении слайдера возвращает нецелое число для последующего подсчета процентов
  if (newDate.onUpdate === UPDATE_EVENTS.SLIDER_PAYMENT) {
    newDate.paymentsPercent = newDate.paymentsPercent / 100
    // Синхронизируем slider с input
    newDate.payment = data.cost * newDate.paymentsPercent
  }


  data = { ...data, ...newDate };
  Logger.success("[UPDATED MODEL DATA]", data);
}


export { getData, setDate };

