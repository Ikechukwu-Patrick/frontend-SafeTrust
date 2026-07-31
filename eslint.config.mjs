import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfigs = compat.extends('next/core-web-vitals', 'next/typescript');

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**'],
  },
  ...nextConfigs,
  {
    files: ['jest.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
