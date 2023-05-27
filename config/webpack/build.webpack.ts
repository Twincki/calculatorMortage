import { Configuration } from "webpack";
import { BuildOptions } from "./interfaces/config.interface";
import { webpackDevServer } from "./dev.server.webpack";
import { webpackLoaders } from "./loaders.webpack";
import { webpackPlugins } from "./plugins.webpack";
import { webpackResolve } from "./resolves.webpack";

export function buildWebpack(options: BuildOptions): Configuration {
  const {
    mode,
    paths,
    isDev,
  } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[hash].js",
      path: paths.output,
      clean: true,
      publicPath: "/",
    },
    plugins: webpackPlugins(options),
    module: {
      rules: webpackLoaders(options),
    },
    resolve: webpackResolve(options),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? webpackDevServer(options) : undefined,
  };
}
