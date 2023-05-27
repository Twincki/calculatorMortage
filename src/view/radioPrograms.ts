import { UPDATE_EVENTS } from "shared/consts/consts";
import { Logger } from "shared/util/logger/Logger.js";
import { updateModel } from "shared/util/updateModel";
import { GetModel } from "shared/types/common";

function init(getData: GetModel) {
  // Если не функция, в консоли отобразится ошибка
  if (typeof getData !== "function") {
    Logger.error("getData должна быть функцией");
    return;
  }

  // Получаем все input для дальнешего использования
  const radioBtns = document.querySelectorAll("input[name=\"program\"]");
  const {
    base, it, gov, zero,
  } = getData().programs;

  // Отлавливаем по id значение и меняем на заданные
  (document.querySelector("#base-value") as HTMLInputElement).value = String(base);
  (document.querySelector("#it-value") as HTMLInputElement).value = String(it);
  (document.querySelector("#gov-value") as HTMLInputElement).value = String(gov);
  (document.querySelector("#zero-value") as HTMLInputElement).value = String(zero);

  // Отлалвливаем по id текст и при помози innerText меняем на заданные
  document.querySelector("#base-text").textContent = `${base * 100}%`;
  document.querySelector("#it-text").textContent = `${it * 100}%`;
  document.querySelector("#gov-text").textContent = `${gov * 100}%`;
  document.querySelector("#zero-text").textContent = `${zero * 100}%`;

  // Используем метод forEach и на каждой итерации(на каждую кнопку)будем отлавливать событие
  radioBtns.forEach((radioBtn) => {
    // Отлавливаем событие
    radioBtn.addEventListener("change", function () {
      Logger.info(this.id);

      console.log("ID", this.id);

      updateModel(this, {
        selectedProgram: parseFloat(this.value),
        onUpdate: UPDATE_EVENTS.RADIO_PROGRAM,
        // id хранит название программы которую выбирает пользователь
        percentProgram: this.id,
      });
    });
  });
}

export default init;