import { UPDATE_EVENTS } from "../../util/invariable.js";
import updateModel from "../../util/updateModel.js";

function init(getData) {
  const input = document.querySelector("#input-cost");

  const { minPrice, maxPrice, cost } = getData();

  const settingCleave = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  // setRawValue устанавливает базовое значение, используется библиотекой
  cleaveInput.setRawValue(cost);

  // Событие добавляющее ошибку при неверном минимальном и максимальном значении
  input.addEventListener("input", function () {
    // getRawValue возвращает записанное значение, используется библиотекой
    const value = parseInt(cleaveInput.getRawValue());

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
      cost: parseInt(cleaveInput.getRawValue()),
      onUpdate: UPDATE_EVENTS.INPUT_COST,
    });
  });

  // Событие при ошибке возвращает минимальное и максимальное значение
  input.addEventListener("change", function () {
    const value = parseInt(cleaveInput.getRawValue());

    if (value < minPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(minPrice);
    }

    if (value > maxPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(maxPrice);
    }
    // Обновить модель
    updateModel(input, {
      cost: parseInt(cleaveInput.getRawValue()),
      onUpdate: UPDATE_EVENTS.INPUT_COST,
    });
  });
  return cleaveInput;
}

export default init;
