import { UPDATE_EVENTS } from "shared/consts/consts";
import Cleave from "cleave.js";
import { updateModel } from "shared/util/updateModel";
import { GetModel } from "shared/types/common";
import { CleaveOptions } from "cleave.js/options";

function init(getData: GetModel) {
  const input = document.querySelector("#input-downpayment") as HTMLInputElement;
  const { payment, getMinPayment, getMaxPayment } = getData();

  const settingCleave: CleaveOptions = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  // setRawValue устанавливает базовое значение, используется библиотекой
  cleaveInput.setRawValue(String(payment));

  // Событие добавляющее ошибку при неверном минимальном и максимальном значении
  input.addEventListener("input", () => {
    const minPayment = getMinPayment();
    const maxPayment = getMaxPayment();

    const value = parseInt(cleaveInput.getRawValue(), 10);

    // Проверка на мин и макс сумму первого платежа
    if (value < minPayment || value > maxPayment) {
      input.closest(".param__details").classList.add("param__details--error");
    }

    if (value >= minPayment && value <= maxPayment) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    // Обновить модель
    updateModel(input, {
      payment: value,
      onUpdate: UPDATE_EVENTS.INPUT_PAYMENT,
    });
    console.log("value !!!", value);
  });

  // Событие при ошибке возвращает минимальное и максимальное значение
  input.addEventListener("change", () => {
    const minPayment = getMinPayment();
    const maxPayment = getMaxPayment();

    const value = parseInt(cleaveInput.getRawValue(), 10);

    if (value < minPayment) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(String(minPayment));
    }

    if (value > maxPayment) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(String(maxPayment));
    }

    updateModel(input, {
      payment: value,
      onUpdate: UPDATE_EVENTS.INPUT_PAYMENT,
    });
    console.log();
    console.log(minPayment);
  });
  return cleaveInput;
}

export default init;