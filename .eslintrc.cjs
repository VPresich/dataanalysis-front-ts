module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/prop-types": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["vite.config.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
