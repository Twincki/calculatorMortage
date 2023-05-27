import { Logger } from "shared/util/logger/Logger";
import { INTEREST_RATE_PROGRAM, UPDATE_EVENTS } from "shared/consts/consts";
import { Model, PartialModel } from "shared/types/common";

let data: Model = {
  percentProgram: INTEREST_RATE_PROGRAM.BASE,
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

function getData(): Model {
  return { ...data };
}

function setDate(newDate: PartialModel) {
  if (newDate.onUpdate === UPDATE_EVENTS.RADIO_PROGRAM) {
    if (newDate.percentProgram === INTEREST_RATE_PROGRAM.ZERO) {
      data.minPaymentsPercent = 0;
    } else {
      data.minPaymentsPercent = 0.15;
    }
  }

  if (newDate.onUpdate === UPDATE_EVENTS.INPUT_COST) {
    if (!newDate.cost) return;

    // Обновление цены базовых значений -------------------------
    // Если стоимость меньше минимальной цены
    if (newDate.cost < data.minPrice) newDate.cost = data.minPrice;
    // Если стоимость больше максимальной цены
    if (newDate.cost > data.maxPrice) newDate.cost = data.maxPrice;
    // ----------------------------------------------------------
  }

  data = { ...data, ...newDate };
  Logger.success("[UPDATED MODEL DATA]", data);
}

export { getData, setDate };
