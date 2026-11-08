import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Desativa a exigência de importar React em todo arquivo 
      "no-unused-vars": "warn",
      "no-undef": "error",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
];