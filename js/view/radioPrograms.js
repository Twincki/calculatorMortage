import { UPDATE_EVENTS } from "../util/invariable.js";
import { Logger } from "../util/logger/Logger.js";
import updateModel from "./../util/updateModel.js";

function init(getData) {
  // Если не функция, в консоли отобразится ошибка
  if (typeof getData !== "function") {
    Logger.error("getData должна быть функцией");
    return;
  }

  // Получаем все input для дальнейшего использования
  const radioBtns = document.querySelectorAll('input[name="program"]');
  const { base, it, gov, zero } = getData().programs;

  //Отлавливаем по id значение и меняем на заданные
  document.querySelector("#base-value").value = base;
  document.querySelector("#it-value").value = it;
  document.querySelector("#gov-value").value = gov;
  document.querySelector("#zero-value").value = zero;

  // Отлавливаем по id текст и при помощи innerText меняем на заданные
  document.querySelector("#base-text").textContent = base * 100 + "%";
  document.querySelector("#it-text").textContent = it * 100 + "%";
  document.querySelector("#gov-text").textContent = gov * 100 + "%";
  document.querySelector("#zero-text").textContent = zero * 100 + "%";

  // Используем метод forEach и на каждой итерации(на каждую кнопку)будем отлавливать событие
  radioBtns.forEach((radioBtn) => {
    // Отлавливаем событие
    radioBtn.addEventListener("change", function () {
      Logger.info(this.id);

      updateModel(this, {
        selectedProgram: parseFloat(this.value),
        onUpdate: UPDATE_EVENTS.RADIO_PROGRAM,
        // id хранит название программы которую выбирает пользователь
        id: this.id,
      });
    });
  });
}

export default init;
