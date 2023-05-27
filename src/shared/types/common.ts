import { INTEREST_RATE_PROGRAM, UPDATE_EVENTS } from "shared/consts/consts";

// Проценстная ставка
export interface InterestRate {
  base: number;
  it: number;
  gov: number;
  zero: number;
}

// Описание модели объекта
export interface Model {
  selectedProgram: number;
  cost: number;
  minPrice: number;
  maxPrice: number;
  minPaymentsPercent: number;
  maxPaymentsPercent: number;
  paymentsPercent: number;
  payment: number;
  getMinPayment: () => number;
  getMaxPayment: () => number;
  percentProgram: INTEREST_RATE_PROGRAM;
  onUpdate: UPDATE_EVENTS;
  programs: InterestRate;
}

export type GetModel = () => Model;
export type PartialModel = Partial<Model>;
