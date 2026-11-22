import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
];