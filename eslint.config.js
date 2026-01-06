import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  // Global ignores - must be a separate object with ONLY ignores key to apply globally
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/.storybook/**",
      "**/*.stories.*",
      "**/*.test.*",
      "**/coverage/**",
      "**/.next/**",
      "**/.vite/**",
      "**/.turbo/**",
      "**/storybook-static/**",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  configPrettier,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: eslintPluginImport,
    },
    rules: {
      // Base rules
      "array-bracket-spacing": ["error", "never"],
      "comma-spacing": "off",
      "default-case": "error",
      "eol-last": "off",
      eqeqeq: "error",
      "func-call-spacing": "error",
      indent: "off",
      "key-spacing": "off",
      "keyword-spacing": 1,
      "max-len": "off",
      "no-console": 1,
      "no-multi-spaces": "error",
      "no-sequences": "error",
      "no-use-before-define": "error",
      radix: "error",
      semi: "off",

      // React specific rules
      "react/react-in-jsx-scope": "error",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-filename-extension": "off",
      "react/no-array-index-key": "off",
      "react/jsx-props-no-spreading": "off",
      "react/forbid-prop-types": "off",
      "react/require-default-props": "off",
      "react/default-props-match-prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/sort-comp": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import rules
      "import/no-unresolved": "off",
      "import/named": "error",
      "import/no-extraneous-dependencies": "off",
      "import/order": "off",
      "import/no-cycle": "off",
      "import/prefer-default-export": "off",
      "import/no-named-as-default": "off",

      // Other rules
      "no-else-return": "off",
      "arrow-parens": "off",
      "no-underscore-dangle": "off",
      "no-continue": "off",
      "func-names": "off",
      "no-new": "off",

      // Accessibility rules
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/media-has-caption": "off",

      // Unused vars
      "no-unused-vars": ["error", { varsIgnorePattern: "^(React|console)$" }],
    },
    settings: {
      react: {
        version: "detect",
        jsxRuntime: "automatic",
      },
      "import/resolver": {
        typescript: {}, // uses jsconfig.json automatically
      },
    },
  },
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
