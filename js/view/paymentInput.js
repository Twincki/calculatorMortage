import { UPDATE_EVENTS } from "../util/invariable.js";
import updateModel from "../util/updateModel.js";

function init(getData) {
  const input = document.querySelector("#input-downpayment");
  const { payment, getMinPayment, getMaxPayment } = getData();

  const settingCleave = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  // setRawValue устанавливает базовое значение, используется библиотекой
  cleaveInput.setRawValue(payment);

  // Событие добавляющее ошибку при неверном минимальном и максимальном значении
  input.addEventListener("input", function () {
    const minPayment = getMinPayment();
    const maxPayment = getMaxPayment();

    const value = parseInt(cleaveInput.getRawValue());

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
  });

  // Событие при ошибке возвращает минимальное и максимальное значение
  input.addEventListener("change", function () {
    const minPayment = getMinPayment();
    const maxPayment = getMaxPayment();

    const value = parseInt(cleaveInput.getRawValue());

    if (value < minPayment) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(minPayment);
    }

    if (value > maxPayment) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(maxPayment);
    }

    updateModel(input, {
      payment: value,
      onUpdate: UPDATE_EVENTS.INPUT_PAYMENT,
    });
  });
  return cleaveInput;
}

export default init;
