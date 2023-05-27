import path from "path";
import { buildWebpack } from "./config/webpack/build.webpack";
import {
  BuildEnv,
  ModeOptions,
} from "./config/webpack/interfaces/config.interface";

export default (env: BuildEnv) => {
  const MODE: ModeOptions = env.mode || "development";
  const PORT = env.port || 3000;
  const isDev = MODE === "development";

  return buildWebpack({
    mode: MODE,
    paths: {
      entry: path.resolve(__dirname, "src", "index.ts"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
      src: path.resolve(__dirname, "src"),
    },
    port: PORT,
    isDev,
  });
};
