const pkg = require("./package.json")
import path from "path"
import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import scss from "rollup-plugin-scss"
import { terser } from "rollup-plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import reactSvg from "rollup-plugin-react-svg"

const isProduction = process.env.NODE_ENV === "production"

// Reference:
// https://github.com/jaebradley/example-rollup-react-component-npm-package/blob/master/rollup.config.js

const banner = `/**
  *
  * JamComments
  * Author: ${pkg.author}
  * Version: v${pkg.version}
  * License: ${pkg.license}
  * URL: ${pkg.homepage}
  *
  */`

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
}

const OUTPUT_DATA = [
  {
    file: pkg.module,
    format: "umd"
  }
  // {
  //     file: pkg.module,
  //     format: "es"
  // }
]

let plugins = [
  scss(),
  resolve(),
  commonjs({
    // include: 'node_modules/**'
    exclude: "src/ui/**"
  }),
  postcss({
    plugins: []
  }),
  babel({
    configFile: path.resolve(__dirname, "babel.config.js"),
    exclude: "node_modules/*"
  }),
  reactSvg({
    // svgo options
    svgo: {
      plugins: [], // passed to svgo
      multipass: true
    },

    // whether to output jsx
    jsx: false,

    // include: string
    include: null,

    // exclude: string
    exclude: null
  })
]

if (isProduction) {
  plugins = [
    ...plugins,
    terser({
      include: [/^.+\.min\.js$/, "*esm*"],
      output: {
        preamble: banner
      }
    })
  ]
}

export default OUTPUT_DATA.map(({ file, format }) => ({
  input: "./src/ui/Shell/index.js",
  output: {
    file,
    format,
    name: "JamComments",
    globals
  },
  plugins,
  external: [...Object.keys(pkg.peerDependencies || {})]
}))
