const pkg = require("./package.json");
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import scss from 'rollup-plugin-scss';
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";

const isProduction = process.env.NODE_ENV === "production";

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
  */`;

const globals = {
    react: "React",
    "react-dom": "ReactDOM"
};

const OUTPUT_DATA = [
    {
        file: pkg.main,
        format: "umd"
    }
    // {
    //     file: pkg.module,
    //     format: "es"
    // }
];

let plugins = [
    scss(),
    commonjs({
        exclude: 'src/ui/**',
    }),
    resolve(),
    babel({
        configFile: path.resolve(__dirname, "babel.config.js"),
        exclude: "node_modules/*"
    })
];

if (isProduction) {
    plugins = [
        ...plugins,
        terser({
            include: [/^.+\.min\.js$/, "*esm*"],
            output: {
                preamble: banner
            }
        })
    ];
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
}));
