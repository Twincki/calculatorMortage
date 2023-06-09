export class Logger {
  static info(...messages) {
    console.log(
      "%c[INFO]",
      "color: #42aaff",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      ...messages
    );
  }

  static success(...messages) {
    console.log(
      "%c[SUCCESS]",
      "color: #50c878",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      ...messages
    );
  }

  static error(...messages) {
    console.log(
      "%c[ERROR]",
      "color: #ff0000",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      ...messages
    );
  }

  static warn(...messages) {
    console.log(
      "%c[WARN]",
      "color: #ffa500",
      `(${new Error().stack.split("\n")[2].trim().split(" ")[1]})`,
      ...messages
    );
  }
}
