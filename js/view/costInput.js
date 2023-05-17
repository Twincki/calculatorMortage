function init(getData) {
  const input = document.querySelector("#input-cost");

  const { minPrice, maxPrice, cost } = getData();

  const settingCleave = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settingCleave);
  cleaveInput.setRawValue(cost);

  input.addEventListener("input", function () {
    const value = parseInt(cleaveInput.getRawValue());
    //Событие добавляющее ошибку при неверном минимальном и максимальном значении

    if (value < minPrice || value > maxPrice) {
      input.closest(".param__details").classList.add("param__details--error");
    }

    if (value >= minPrice && value <= maxPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    input.addEventListener("change", function () {
      const value = parseInt(cleaveInput.getRawValue());
      //Событие при ошибке возвращает минимальное и максимальное значение

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
    });
  });
}

export default init;
