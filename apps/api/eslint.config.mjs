import { config as base } from "@repo/eslint-config/base";
import { honoConfig } from "@repo/eslint-config/hono";

export default [
  ...base,
  ...honoConfig,
  {
    rules: {
      // Example project-specific tweaks can go here
    },
  },
];
