import { Logger } from "../util/logger/Logger.js";
import { updateModel } from "./../util/updateModel.js";

function init(getData) {
  // Если не функция, в консоли отобразится ошибка
  if (typeof getData !== "function") {
    Logger.error("getData должна быть функцией");
    return;
  }

  const radioBtns = document.querySelectorAll('input[name="program"]');
  // Получаем все input для дальнешего использования
  const { base, it, gov, zero } = getData().programs;

  document.querySelector("#base-value").value = base;
  document.querySelector("#it-value").value = it;
  document.querySelector("#gov-value").value = gov;
  document.querySelector("#zero-value").value = zero;
  //Отлавливаем по id значение и меняем на заданные выше

  document.querySelector("#base-text").textContent = base * 100 + "%";
  document.querySelector("#it-text").textContent = it * 100 + "%";
  document.querySelector("#gov-text").textContent = gov * 100 + "%";
  document.querySelector("#zero-text").textContent = zero * 100 + "%";
  // Отлалвливаем по id текст и при помози innerText меняем на заданные выше

  radioBtns.forEach((radioBtn) => {
    // Используем метод forEach и на каждой итерации(на каждую кнопку)будем отлавливать событие
    radioBtn.addEventListener("change", function () {
      //Отлавливаем событие
      // Logger.info(this);
      // Logger.info(parseFloat(this.value));
      //Метод parseFloat переводит в числа и отсеивает буквы, number в свою очередь не отсеивает буквы.
      Logger.info(this.id);

      updateModel(this, {
        selectedProgram: parseFloat(this.value),
        onUpdate: "radioProgram",
        id: this.id,
      });
    });
  });
}

export default init;
