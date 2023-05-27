import Cleave from "cleave.js";
import { UPDATE_EVENTS } from "shared/consts/consts";
import { Model } from "shared/types/common";
import { CleaveOptions } from "cleave.js/options";
import { updateModel } from "shared/util/updateModel";

function init(getData: () => Model) {
  const input = document.querySelector("#input-cost") as HTMLInputElement;

  const { minPrice, maxPrice, cost } = getData();

  const settingCleave: CleaveOptions = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  // setRawValue устанавливает базовое значение, используется библиотекой
  cleaveInput.setRawValue(String(cost));

  // Событие добавляющее ошибку при неверном минимальном и максимальном значении
  input.addEventListener("input", () => {
    // getRawValue возвращает записанное значение, используется библиотекой
    const value = parseInt(cleaveInput.getRawValue(), 10);

    if (value < minPrice || value > maxPrice) {
      input.closest(".param__details").classList.add("param__details--error");
    }

    if (value >= minPrice && value <= maxPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    // Обновить модель
    updateModel(input, {
      cost: parseInt(cleaveInput.getRawValue(), 10),
      onUpdate: UPDATE_EVENTS.INPUT_COST,
    });
  });

  // Событие при ошибке возвращает минимальное и максимальное значение
  input.addEventListener("change", () => {
    const value = parseInt(cleaveInput.getRawValue(), 10);

    if (value < minPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(String(minPrice));
    }

    if (value > maxPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(String(maxPrice));
    }

    // Обновить модель
    updateModel(input, {
      cost: parseInt(cleaveInput.getRawValue(), 10),
      onUpdate: UPDATE_EVENTS.INPUT_COST,
    });
  });
  return cleaveInput;
}

export default init;
