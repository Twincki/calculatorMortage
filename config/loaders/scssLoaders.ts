import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function scssLoaders(isDev: boolean) {
  return {
    test: /\.s[ac]ss|css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (path: string) => Boolean(path.includes(".module.")),
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };
}
