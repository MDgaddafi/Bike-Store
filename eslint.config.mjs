import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-unused-expressions":'error',
      "prefer-const": "error",
      "no-console":"warn",
      "no-undef":"error"
    },
    "globals":{
      "process":"readonly"
    }

  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];