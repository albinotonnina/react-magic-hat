import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      name: pkg.main,
      file: pkg.main,
      format: "cjs"
    },
    {
      name: pkg.module,
      file: pkg.module,
      format: "es"
    },
    {
      name: pkg.browser,
      file: pkg.browser,
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes"
      }
    }
  ],
  plugins: [
    resolve(),

    babel({
      presets: ["react"],
      exclude: "node_modules/**" // only transpile our source code
    }),
    uglify()
  ],
  external: ["react", "prop-types", "react-dom"]
};