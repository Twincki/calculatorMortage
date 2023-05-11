export class Logger {
  static info(message) {
    console.log(
      "%c[INFO]",
      "color: #42aaff",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      message
    );
  }

  static success(message) {
    console.log(
      "%c[SUCCESS]",
      "color: #50c878",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      message
    );
  }

  static error(message) {
    console.log(
      "%c[ERROR]",
      "color: #ff0000",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      message
    );
  }

  static warn(message) {
    console.log(
      "%c[WARN]",
      "color: #ffa500",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      message
    );
  }
}
