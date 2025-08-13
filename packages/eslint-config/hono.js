import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for Hono (Node.js runtime, TS + JSX via hono/jsx).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const honoConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    plugins: { onlyWarn },
  },
  {
    ignores: ["dist/**"],
  },
];
