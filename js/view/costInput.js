function init(getData) {
  const input = document.querySelector("#input-cost");

  const settingCleave = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  new Cleave(input, settingCleave);
}

export default init;
