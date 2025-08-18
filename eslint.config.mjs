import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  {
    rules: {
      // Basic rules - not too strict
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',

      // React specific
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',

      // Next.js specific
      '@next/next/no-img-element': 'warn',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'warn',

      // Tanstack specific
      '@tanstack/eslint-plugin-query': 'warn',
    },
  },
];

export default eslintConfig;
