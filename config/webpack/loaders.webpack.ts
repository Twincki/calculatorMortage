import { RuleSetRule } from "webpack";
import { BuildOptions } from "./interfaces/config.interface";
import { scssLoaders } from "../loaders/scssLoaders";
import { svgLoader } from "../loaders/svgLoader";

export function webpackLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  const SVGLoader = svgLoader();

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const scssLoader = scssLoaders(isDev);

  return [fileLoader, SVGLoader, tsLoader, scssLoader];
}
