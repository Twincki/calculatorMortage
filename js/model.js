import { Logger } from "./util/logger/Logger.js";

let data = {
  selectedProgram: 0.1,
  programs: {
    base: 0.1,
    it: 0.047,
    gov: 0.046,
    zero: 0.12,
  },
};

function getData() {
  return { ...data };
}

function setDate(newDate) {
  data = { ...data, ...newDate };
  Logger.success(data);
}

export { getData, setDate };
