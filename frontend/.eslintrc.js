module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-var": "error",
    "brace-style": "error",
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": "off",
    "import/no-unused-modules": [1, { unusedExports: true }],
    "prefer-template": "error",
    "space-before-blocks": "error",
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.tsx",
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.spec.tsx",
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
