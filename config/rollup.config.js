import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import typescript from "typescript";
import pkg from "../package.json";
import json from "@rollup/plugin-json";

export default {
  input: "index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    ts({ typescript }),
    terser({ ecma: 5, ie8: true, safari10: true }),
    json(),
  ],
};
