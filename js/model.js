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
  time: 10,
  maxTime: 30,
  minTime: 1,
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

function setDate(newData) {
  if (newData.onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
    if (newData.id === "zero-value") {
      data.minPaymentsPercent = 0;
    } else {
      data.minPaymentsPercent = 0.15;
    }
  }

  if (
    newData.onUpdate === UPDATE_EVENTS.INPUT_COST
    || newData.onUpdate === UPDATE_EVENTS.SLIDER_COST
  ) {
    // Обновление цены базовых значений стоимости недвижимости -------------------------
    // Если стоимость меньше минимальной цены
    if (newData.cost < data.minPrice) newData.cost = data.minPrice;
    // Если стоимость больше максимальной цены
    if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;
    // ----------------------------------------------------------

    // Обновление цены новых значений первоначального взноса -------------------------
    // Если стоимость меньше минимальной цены
    if (data.payment > data.getMaxPayment()) data.payment = data.getMaxPayment();
    // Если стоимость больше максимальной цены
    if (data.payment < data.getMinPayment()) data.payment = data.getMinPayment();
    // ----------------------------------------------------------
  }

  if (newData.onUpdate === UPDATE_EVENTS.INPUT_PAYMENT) {
    // Пересчитываем проценты %
    newData.paymentsPercent = (newData.payment * 100) / data.cost;

    // Если проценты больше допустимых значений
    if (newData.paymentsPercent > data.maxPaymentsPercent) {
      newData.paymentsPercent = data.maxPaymentsPercent;
      newData.payment = data.cost * data.maxPaymentsPercent;
    }

    // Если проценты меньше допустимых значений
    if (newData.paymentsPercent < data.minPaymentsPercent) {
      newData.paymentsPercent = data.minPaymentsPercent;
      newData.payment = data.cost * data.minPaymentsPercent;
    }
  }

  // При изменении слайдера возвращает нецелое число для последующего подсчета процентов
  if (newData.onUpdate === UPDATE_EVENTS.SLIDER_PAYMENT) {
    // TODO: здесь требуется оптимизировать код
    newData.paymentsPercent /= 100;
    // Синхронизируем slider с input
    newData.payment = data.cost * newData.paymentsPercent;
  }

  // Обновление базовых значение срока кредита
  if (newData.onUpdate === UPDATE_EVENTS.INPUT_TIME) {
    // Если срок меньше минимального
    if (newData.time < data.minTime) newData.time = data.minTime;
    // Если срок больше максимального
    if (newData.time > data.maxTime) newData.time = data.maxTime;
  }

  data = { ...data, ...newData };
  Logger.success("[UPDATED MODEL DATA]", data);
}

export { getData, setDate };
