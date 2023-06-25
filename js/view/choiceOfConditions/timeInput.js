import { UPDATE_EVENTS } from "../../util/invariable.js";
import updateModel from "../../util/updateModel.js";

function init(getData) {
  const input = document.querySelector("#input-term");

  const { minTime, maxTime, time } = getData();

  const settingCleave = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  // setRawValue устанавливает базовое значение, используется библиотекой
  cleaveInput.setRawValue(time);

  // Событие добавляющее ошибку при неверном минимальном и максимальном значении
  input.addEventListener("input", function () {
    // getRawValue возвращает записанное значение, используется библиотекой
    const value = parseInt(cleaveInput.getRawValue());

    if (value < minTime || value > maxTime) {
      input.closest(".param__details").classList.add("param__details--error");
    }

    if (value >= minTime && value <= maxTime) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    // Обновить модель
    updateModel(input, {
      time: parseInt(cleaveInput.getRawValue()),
      onUpdate: UPDATE_EVENTS.INPUT_TIME,
    });
  });

  // Событие при ошибке возвращает минимальное и максимальное значение
  input.addEventListener("change", function () {
    const value = parseInt(cleaveInput.getRawValue());

    if (value < minTime) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(minTime);
    }

    if (value > maxTime) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(maxTime);
    }
    // Обновить модель
    updateModel(input, {
      time: parseInt(cleaveInput.getRawValue()),
      onUpdate: UPDATE_EVENTS.INPUT_TIME,
    });
  });
  return cleaveInput;

}

export default init;
