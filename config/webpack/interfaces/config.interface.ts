export type ModeOptions = "production" | "development";

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
}

export interface BuildServer {
  port: number;
  mode: ModeOptions;
}

export interface BuildEnv {
  mode: ModeOptions;
  port: number;
}

export interface BuildOptions {
  mode: ModeOptions;
  paths: BuildPaths;
  port: number;
  isDev: boolean;
}
